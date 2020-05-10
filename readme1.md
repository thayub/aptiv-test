Xendit Coding Exercise
The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Xendit. Please follow the instructions below to complete the assessment.

API Documentation

API Documentation is currently hosted in http://backend-api-test.surge.sh

To generate the documentation, run npm run doc:generate. All files of the documentation will be available in /doc folder

To deploy the documentation, run npm run doc:deploy. Since Surge.sh is being used to host the documentation, follow the steps outlined.

If Not Authorised error (bug) occurs, re-run the command.
To deploy the documentation to a custom URL
Follow the Setting a CNAME instructions in https://surge.sh/help/adding-a-custom-domain
Copy .env.sample to .env and set the URL in the API_WEBSITE_URL variable.
Setup

Create a new repository in your own github profile named backend-coding-test and commit the contents of this folder
Ensure node (>8.6 and <= 10) and npm are installed
Run npm install
Run npm test
Run npm start
Hit the server to test health curl localhost:8010/health and expect a 200 response
Tasks

Below will be your set of tasks to accomplish. Please work on each of these tasks in order. Success criteria will be defined clearly for each task

Documentation
Implement Tooling
Implement Pagination
Refactoring
Security
Load Testing
Documentation

Please deliver documentation of the server that clearly explains the goals of this project and clarifies the API response that is expected.

Success Criteria

A pull request against master of your fork with a clear description of the change and purpose and merge it
[BONUS] Create an easy way to deploy and view the documentation in a web format and include instructions to do so
Implement Tooling

Please implement the following tooling:

eslint - for linting
nyc - for code coverage
pre-push - for git pre push hook running tests
winston - for logging
Success Criteria

Create a pull request against master of your fork with the new tooling and merge it
eslint should have an opinionated format
nyc should aim for test coverage of 80% across lines, statements, and branches
pre-push should run the tests before allowing pushing using git
winston should be used to replace console logs and all errors should be logged as well. Logs should go to disk.
Ensure that tooling is connected to npm test
Create a separate pull request against master of your fork with the linter fixes and merge it
Create a separate pull request against master of your fork to increase code coverage to acceptable thresholds and merge it
[BONUS] Add integration to CI such as Travis or Circle
[BONUS] Add Typescript support
Implement Pagination

Please implement pagination to retrieve pages of the resource rides.

Create a pull request against master with your changes to the GET /rides endpoint to support pagination including:
Code changes
Tests
Documentation
Merge the pull request
Refactoring

Please implement the following refactors of the code:

Convert callback style code to use async/await
Reduce complexity at top level control flow logic and move logic down and test independently
[BONUS] Split between functional and imperative function and test independently
Success Criteria

A pull request against master of your fork for each of the refactors above with:
Code changes
Tests
Security

Please implement the following security controls for your system:

Ensure the system is not vulnerable to SQL injection
[BONUS] Implement an additional security improvement of your choice
Success Criteria

A pull request against master of your fork with:
Changes to the code
Tests ensuring the vulnerability is addressed
Load Testing

Please implement load testing to ensure your service can handle a high amount of traffic

Success Criteria

To run Load Testing: npm run test:load
Implement load testing using artillery
Create a PR against master of your fork including artillery
Ensure that load testing is able to be run using npm test:load. You can consider using a tool like forever to spin up a daemon and kill it after the load test has completed.
Test all endpoints under at least 100 rps for 30s and ensure that p99 is under 50ms