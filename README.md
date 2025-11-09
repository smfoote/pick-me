# Pick Me!

This repository is a tool for fairly calling on students in class. Each student in class has
a weight that is calculated based on the number of times that student has been called. The
random student picker chooses a student based on those weights, so students that have been
called on more times are less likely to be called than students who have been called fewer
times.

## How to use

[TODO] A live version of this application will be made available online soon. Until then,
feel free to deploy this app yourself or run it locally.

### Running locally

This app is built using React Router in framework mode. Feel free to follow the [React
Router docs](https://reactrouter.com/start/framework/installation) to learn more. To run
this application locally, follow these steps.

1. Clone the repository
1. Install dependencies by running `$ npm install` from the project's main directory
1. Run `$ npm run dev` to start the app
1. Open the localhost URL that is printed to the terminal when the app starts running

### Deploying

More detailed instructions for deploying are probably forthcoming, but this is a simple
React Router app with no database, so it can be deployed just about anywhere.

## No database? How?

Pick-me uses the database built into the browser to persist student data. This database
is called IndexedDB. This means that all of your student data stays on your computer.
Not only is it not saved on a server, it is never even sent to a server. Yay! But, this
also means that your student data is only available on the one computer that you are using.

### No database? Why?

Based on the most likely use case of a teacher or professor using this application to call
on students in their class, it seems unlikely that the user will be using multiple different
computers (or browsers, hopefully). So, the need to keep the data synced to the cloud seems
unnecessary. Cloud syncing requires a remote database, which is costly to run, and the data
grows over time, making it more costly. Keeping the data secure and compliant with local laws
is expensive. The distributed, local data model of this project keeps your data secure on your
own computer, and keeps the cost of running a public version of this application extremely
low (assuming such a public version does become available--if you are hosting a version,
please let us know).

### No syncing? But isn't that why we have an Internet?

I guess that's one of the reasons, but if you want to sync your data, request an
export/import feature so you can sync your data between computers and browsers yourself.

## Requesting features

Please create GitHub issues with feature requests. Each request will be examined and
considered, but no request is guaranteed to be built.

## Contributing

We love merging community PRs, but... unsolicited feature PRs will be rejected immediately.
Only PRs associated with an approved feature request or an issue marked as a bug will be
accepted. This is not to discourage community contributions, but to save the community time.
Don't write a bunch of code that will never be merged; that makes everyone sad.
