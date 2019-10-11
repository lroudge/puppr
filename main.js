window.onload = function () {
    // Creating an eventHub allows to add events from any components and to listen to these events from anywhere
    const eventHub = new Vue()

    // Component: nav-bar
    // Navigation bar appearing at the top of the app with the logo and the "profile" and "matches" icon
    Vue.component('nav-bar', {
        template: `
          <div class="nav-bar">
            <img class="profile-icon" src="dog-icon.png">
            <h1>PuppR</h1>
            <img class="matches" src="match-icon.png">
          </div>`
    })

    // Component: profile
    // Current profile with a picture, and a bio appearing on a click event on the picture
    // On clicking the image, the profileInfo attribute turns true and the profileInfo appears
    // When the user clicks on like or pass, the profile receives the event change-profile
    // and displays the next profile in the queue
    Vue.component('profile', {
        props: {
            profilesList: Array,
            currentProfile: Number
        },
        template: `
        <div class="profileInfo" v-on:click="hideInfo" v-if="profileInfo">
            <h2>Bio</h2>
            <p>{{ bio }}</p>
            <h2>Likes</h2>
            <p>{{ likes }}</p>
            <h2>Dislikes</h2>
            <p>{{ dislikes }}</p>
          </div>
        <div class="profile" :style="{ 'background-image': 'url(' + image + ')' }" v-on:click="showInfo" v-else></div>`,
        data() {
            return {
                index: 0,
                profileInfo: false
            }
        },
        methods: {
            showInfo() {
                this.profileInfo = true;
            },
            hideInfo() {
                this.profileInfo = false;
            }
        },
        computed: {
            image() {
                return this.profilesList[this.index].image;
            },
            bio() {
                return this.profilesList[this.index].bio;
            },
            likes() {
                return this.profilesList[this.index].likes;
            },
            dislikes() {
                return this.profilesList[this.index].dislikes;
            }
        },
        mounted() {
            eventHub.$on('change-profile', idx => {
                this.index = idx;
            })
        }
    })

    // Component displaying the name, the age and the city where the dog lives
    // Updates with change-profile event
    Vue.component('name-age', {
        props: {
            profilesList: Array,
            currentProfile: Number
        },
        template: `
          <div class="name-age">
            <h1>{{ name }}, {{ age }}</h1>
            <h2>{{ city }}</h2>
        </div>`,
        data() {
            return {
                index: 0
            }
        },
        computed: {
            name() {
                return this.profilesList[this.index].name;
            },
            age() {
                return this.profilesList[this.currentProfile].age;
            },
            city() {
                return this.profilesList[this.currentProfile].city;
            }
        },
        mounted() {
            eventHub.$on('change-profile', idx => {
                this.index = idx;
            })
        }
    })

    // Hard coded profiles for testing

    const profile1 = {
        image: 'joey.jpg',
        name: 'Joey',
        age: 5,
        city: 'Paris',
        bio: 'I am the goodest boi!',
        likes: 'I like small dogs',
        dislikes: 'Running after a ball'
    }

    const profile2 = {
        image: 'sasha.jpg',
        name: 'Sasha',
        age: 3,
        city: 'Los Altos',
        bio: 'I am the goodest girle!',
        likes: 'I like running a lot',
        dislikes: 'When my owner leaves for work'
    }

    const profile3 = {
        image: 'riley.jpeg',
        name: 'Riley',
        age: 7,
        city: 'San Francisco',
        bio: 'I am a model for Instagram and Twitter!',
        likes: 'I like rolling in the mud!',
        dislikes: 'Peanut butter, yuck'
    }

    // View for the entire page, composed of all the above components (nav-bar, profile, name-age) and an action div
    // containing a pass, a previous and a like button that fire the change-profile event
    const swiping = new Vue({
        el: '#swiping',
        data: {
            profilesList: [profile1, profile2, profile3],
            currentProfile: 0
        },
        methods: {
            nextProfile() {
                if (this.currentProfile === this.profilesList.length - 1)
                    this.currentProfile = 0;
                else
                    this.currentProfile++;
                console.log(this.currentProfile);
                let idx = this.currentProfile;
                eventHub.$emit('change-profile', idx);
            },
            previousProfile() {
                if (this.currentProfile === 0)
                    this.currentProfile = this.profilesList.length - 1;
                else
                    this.currentProfile--;
                console.log(this.currentProfile);
                let idx = this.currentProfile;
                eventHub.$emit('change-profile', idx);
            }
        }
    })
}