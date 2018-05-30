#!/usr/bin/env node
/* eslint-disable no-console,no-sync */

const fs = require('fs');
const simpleGit = require('simple-git/promise')();
const CLIEngine = require('eslint').CLIEngine;
const Mocha = require('mocha');

// Setup env for babel
process.env.NODE_ENV = 'test';

function printError(msg) {
  console.log('\x1b[31m', msg, '\x1b[0m');
}

function printSuccess(msg) {
  console.log('\x1b[32m', msg, '\x1b[0m');
}

function printInfo(msg) {
  console.log('\x1b[34m', msg, '\x1b[0m');
}

simpleGit.diff(['HEAD', '--name-status', '--cached']).then(data => {
  let status = 0;
  const changedFiles = data.match(/[^\s]*.jsx*/gi);

  if (changedFiles === null || changedFiles.length === 0) {
    printSuccess('No JavaScript file changed for this commit.');

    process.exit(status);
  }

  const testPaths = changedFiles
    .map(path => path.replace('.js', '.test.js'))
    .filter(path => fs.existsSync(path));

  printInfo('Changed files:');
  changedFiles.forEach(path => printInfo(` * ${path}`));

  printInfo('\nChecking JS style errors');
  const cli = new CLIEngine();
  const formatter = cli.getFormatter();
  const report = cli.executeOnFiles(changedFiles);

  if (report.errorCount !== 0) {
    status = 1;

    printError(`Founded ${report.errorCount} JS style errors.`);
    console.log(formatter(report.results));
    printError('Please fix and stage the files before committing again.');
  } else {
    printSuccess('No JS code style errors found.');
  }

  if (testPaths.length === 0) {
    process.exit(status);
  } else {
    printInfo('\nUnit tests files:');
    testPaths.forEach(path => printInfo(` * ${path}`));

    printInfo('\nChecking unit tests errors');
    const mocha = new Mocha();

    mocha.addFile('./test/mochaConfig.js');

    testPaths.forEach(testPath => mocha.addFile(testPath));
    mocha.run(errorsCount => {
      if (errorsCount !== 0) {
        printError('Please fix and stage the files before committing again');
        status = 1;
      } else {
        printSuccess('No unit tests errors found.');
      }
      process.exit(status);
    });
  }
});
