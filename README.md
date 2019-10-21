# PuppR ~ *Anything is pawssible*

![logo](https://i.imgur.com/zg49V5K.png)

# Introduction

## The Project
Every dog owner knows the struggle of moving in a new place and not knowing anyone else with a dog. But our dogs need to socialize too! This is why we created PuppR.

PuppR is a dating site for dogs! Dog owners can create a profile for their pup, and start swiping through other dogs in their area. If they want to meet a dog, they can "like" their profile, and if that dog likes them back, it's a match! From there, the two users can decide to contact each other and organize a playdate for their dogs. If they don't like that dog, they can just "pass" it.

Other features include: editing the dog's profile, modifying the user settings, a "previous" button to see the previous profile again.

## The Context
This project is our Portfolio Project, concluding our Foundations Year at Holberton School. We were able to choose who we wanted to work with and what we wanted to work on, as long as we present a working program at the end of the three weeks of development.

## The Team
We are three dog enthusiasts who are passionate about coding but also like to keep it fun!

* **Marc Cavigli** [@MarcCavigli](https://twitter.com/MarcCavigli) - Singer, Musician, song-writer and composer, but also a very talented Software Engineer.
* **Drew Maring** [@drewmaring](https://twitter.com/drewmaring) - Dog owner and great Software Engineer, formerly working at Docker as a Solutions Architect / Technical Account Manager.
* **Laura Roudge** [@LRoudge](https://twitter.com/LRoudge) - Former Dancer and Comedian, the "french touch" Software Engineer of the team.

Follow us on Twitter for more dog and tech related awesomeness!

# Tutorial

## Take a tour of the deployed version
## Run PuppR with Vue-CLI
## Known bugs

# Architecture

## Overview
Our web app is a single-page app, coded mainly in Node.js. PuppR is front-end heavy, meaning that we focused our time and energy in developping a simple but easy to use and fun app. We designed most of the User Interface, using plain CSS and some native Vue transitions and animations. We also incorporated some BootstrapVue elements which offered a simple solution for some features like image uploading.

## Vue.js
For this project, we decided to focus on learning a new front-end framework. Following the advice of mentors and professionals, we chose to learn and use Vue.js.

Every different section of the app is a Vue component, and all the components can be found in the directory [src/components/](./src/components/). The main component "App" is defined in [App.vue](./src/App.vue), and is the entry point of the app.

All the components are linked together thanks to a VueRouter instance, defined in [index.js](./routes/index.js). Each component is linked to a route, which path is appended automatically at the end of our URL.

The [main.js](./src/main.js) file contains the instanciation of the Vue for the entire app, as well as the config options, database session and authentication session.

Another interesting point about Vue.js is that it allowed us to use a store, defined in [store.js](./src/store.js). This store is a front-end store that keep strack of the state of components and data throughout the app. This is were the data from our database requests is stored and updated before going back in the database. This store also allows to not pass props from each component to all its children components, and to access data from anywhere without having to use and event bus.

## Firebase

### Firestore
### Fire auth

## Google Cloud Storage

# Acknowledgments
