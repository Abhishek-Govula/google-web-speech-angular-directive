var speechRecog = angular.module('speech-recognition', []);
speechRecog.directive('speechListener', [function () {
    function link(scope, element, attr) {
        if (!('webkitSpeechRecognition' in window)) {
            //Speech API not supported here…
            alert("Speech API is not supported!!");
        } else {
            console.log("Speech API support is available!!");
            var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
            recognition.continuous = false;   //Suitable for dictation. 
            recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
            //Define some more additional parameters for the recognition:
            recognition.lang = "en-US";
            //recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...


            //Varibales we use to send the data across the events
            var _results = null;
            var isFinal = false;

            scope.$on('startListening', function (event, data) {
                console.log("Got the start listening event in the directive");
                recognition.start();
                // scope.$digest();
            });
            scope.$on('stopListening', function (event, data) {
                console.log("Got the stop listening event in the directive");
                recognition.stop();
                // scope.$digest();
            });

            recognition.onstart = function () {
                console.log("Emitting the started event frm the directive");
                scope.$emit('startedListening');
                // scope.$digest();
            };
            recognition.onend = function () {
                console.log("Emitting the stopped event frm the directive");
                scope.$emit('stoppedListening', _results);
                // scope.$digest();
            };

            recognition.onresult = function (event) { //the event holds the results
                //Yay – we have results! Let’s check if they are defined and if final or not:
                if (typeof (event.results) === 'undefined') { //Something is wrong…
                    console.log("Stoping the recognition explicitly because of error!!");
                    recognition.stop();
                    return;
                }
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) { //Final results
                        console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
                        _results = event.results[i][0].transcript;
                        isFinal = true;

                        scope.$emit('finalResults', _results);

                        recognition.stop();

                    } else {   //i.e. interim...
                        console.log("interim results: " + event.results[i][0].transcript);  //You can use these results to give the user near real time experience.
                        _results = event.results[i][0].transcript;
                        isFinal = false;

                        scope.$emit('interimResults', _results);
                    }
                } //end for loop
            }
        }
    }
    return {
        restrict: 'E',
        // templateUrl: 'my-customer.html'
        link: link

    }
}]);