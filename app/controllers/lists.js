import Controller from '@ember/controller';
import { computed } from '@ember/object';
export default Controller.extend({
    contents: Ember.inject.controller(),
    uploadedCount: null,
    success: null,
    started: null,
    form: computed(function () {
        return {
            text: ''
        }
    }),
    actions: {
        move: function () {
            let text = this.get('text');
            let fetchObject = {
                method: 'POST',
                body: text
            };
            fetch('http://localhost:8080/wiki/move', fetchObject)
                .then((response) => response.text())
                .then((data) => {
                    this.set('started',null);
                    this.set('success',1);
                    setTimeout(function() {
                        window.location.reload(true)
                    }, 2000);                   
                })
                .catch(error => {
                    alert(`There has been a problem with your fetch operation: ${error}`);
                });
        },
        getUploadedCount: function () {
            let text = this.get('text');
            let fetchObject = {
                method: 'GET'
            }
            function countFunction(callback) {
                var countFunction = setInterval(function () {
                    fetch('http://localhost:8080/wiki/status?searchText=' + text, fetchObject)
                        .then(res => res.json())
                        .then((json) => {
                            console.info(json.success);
                            callback(json.count);
                            if (json.success) {
                                clearInterval(countFunction);
                            }
                        }).catch((err) => {
                            console.error(err);
                        });
                }, 1500);
            }

            countFunction((x) => {
                this.set('started',1);
                this.set('uploadedCount', x);
            });
        } 
    }    
});