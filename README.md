# google-web-speech-angular-directive

## Steps to use the directive
1. Include this file in your app.
2. Add the dependency "speech-recognition" into the application.
3. Use the element <speech-listener></speech-listener> for using the web speech directive.

## How to use ?
1. To start listening, emit the **startListening** event.
    Example: $scope.$emit("startListening")
2. To stop listening, emit the "stopListening" event.
    Example: $scope.$emit("stopListening")

After emitting the startListening event, if the speech recognition has successfully started, the **startedListening** event is emitted from the directive
After emitting the stopListening event, if the speech recognition has successfully stopped, the **stoppedListening** event is emitted from the directive
> These events can be used to show/hide a record process on the screen.

### Reading the data.
1. Listen to the **finalResults** event and read the data for getting te final result. After the final result, the recognition is stopped automatically.
2. Listen to the **interimResults** event, this can be used for a near real time speech to text conversion on the screen.

##NOTE
>This directive uses *webkitSpeechRecognition* and will need internet connection to work.
