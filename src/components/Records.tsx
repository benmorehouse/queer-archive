import React from 'react';

import Divider from './Divider';

var currentRecords : Array<string> = [];

class Records extends React.Component {
  constructor(props: any) {
    super(props);
    this.loadRecords();
  }

  loadRecords() {
    var AWS = require('aws-sdk');
    AWS.config.update({
      region: 'us-west-2',
      accessKeyId: 'AKIARKESCAAKMDFPFDVQ',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

  
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const params = {
      TableName: 'queer-archive',
      ProjectionExpression: "TITLE, DESCRIPTION, EMAIL_ADDRESS, LINK, AUTHOR",
    };
  
    ddb.scan(params).promise().then((value: any) => {
      var currentState : Array<string> = [];
      for (const index in Object.keys(value.Items) ) {
        var array: any = [
          value.Items[index].TITLE["S"],
          value.Items[index].AUTHOR["S"],
          value.Items[index].DESCRIPTION["S"],
          value.Items[index].LINK["S"],
        ];
        currentState.push(array);
      }
      currentRecords = currentState;
      this.forceUpdate();
    });
    return ;
  }

  render() {
    return (
    <div className={`py-12 bg-background`} id="records">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
            <span>
              The Archive
            </span>
        </h1>
        <Divider />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
          </h2>
        </div>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-10">
                  Title
                </th>
                <th scope="col" className="py-3 px-10">
                  Author
                </th>
                <th scope="col" className="py-3 px-10">
                  Description
                </th>
                <th scope="col" className="py-3 px-10">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map(element => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {element[0]}
                  </th>
                  <td className="py-4 px-10">{element[1]}</td>
                  <td className="py-4 px-10">{element[2]}</td>
                  <td className="py-4 px-10"><a href={element[3]}> {element[3]} </a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  }
}

export default Records;
