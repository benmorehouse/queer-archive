import React from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const Submit = () => {

  // Connect to dynamoDB
  var AWS = require('aws-sdk');
  const uuid = require('uuid');

  AWS.config.update({
    region: 'us-west-2',
    accessKeyId: 'AKIARKESCAAKMDFPFDVQ',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 
 
  const { submit } = config;

  const submitForm = async (event: any) => {
    event.preventDefault();
    var params = {
      TableName: 'queer-archive',
      Item: {
        'uuid' : { S: uuid.v1() },
        'TITLE' : { S: event.target.title.value },
        'DESCRIPTION' : { S: event.target.description.value },
        'EMAIL_ADDRESS' : { S: event.target.emailAddress.value },
        'LINK' : { S: event.target.link.value },
        'AUTHOR' : { S: event.target.author.value },
      }
    };
   
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err: Error, data: any) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        location.reload();
      }
    });
  };

  return (
    <section className={`bg-background py-8 submit`} id="contribute">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {submit.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
      </div>
      <p className={`text-gray-600 w-1/1 my-2 text-center`}>{submit.description}</p>
      <div className="mt-10 sm:mt-0 place-items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={submitForm}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        name="title"
                        id="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name of Author
                      </label>
                      <input
                        name="author"
                        id="last-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Email address
                      </label>
                      <input
                        name="emailAddress"
                        id="email-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Link to the Art
                      </label>
                      <input
                        name="link"
                        id="email-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Brief Description
                      </label>
                      <textarea
                        name="description"
                        id="email-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Submit;
