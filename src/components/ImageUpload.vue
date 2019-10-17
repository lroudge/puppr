<template>
    <div>
        <h1>Upload your image</h1>
        <form action="#">
            <div class="form-group">
                <h4>image</h4>
                <input type="file" accept="image/*" @change="onFileChanged" required autofocus/>
            </div>
            <button type="button" @click.prevent="onUpload">Upload!</button>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { db, storage } from "../main";
    import { router } from "../routes/index"
    import { mapGetters } from "vuex";
    
    export default {
        data () {
            return {
                selectedFile: null
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            onFileChanged (event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                const ref = firebase.storage().ref().child(this.user.data.localId + "/" + this.selectedFile.name)
                ref.put(this.selectedFile).then(function(snapshot) {
                    alert('Uploaded image successfully!');
                }).catch(function (err) {
                    alert(err)
                });
            }
        }
    
    }
</script>