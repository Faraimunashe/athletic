const React = require("react-native");

const { StyleSheet } = React;

const primaryGreen = "#4CAF50";
const primaryBlue = "#2196F3";
const lightBlue = "#03A9F4";
const darkBlue = "#0D47A1";

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5", // Light background color
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
    color: primaryBlue,
  },
  loginFormView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: darkBlue,
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'contain', // or 'cover', 'stretch', 'center', etc.
  },
  imageContainer: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
  },
  registerLink: {
    fontSize: 15,
    color: 'blue',
  },
});

export default styles;
