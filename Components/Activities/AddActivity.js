//Coming
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import firebase, { auth } from "firebase";
import HeaderX from "../Activities/HeaderX";
import {TagSelect} from 'react-native-tag-select';


import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



export default class AddActivity extends React.Component {
  state = {
    price: "",
    header: "",
    description: "",
    seller: firebase.auth().currentUser.email,
    city: "",
    availability: "",
    timeofCourse: "",
    location: "",
    activity: [],
    image: "https://i.imgur.com/DG8iV3O.jpg",



  };





  handlePriceChange = (text) => this.setState({ price: text });

  //handleActivityChange = (text) => this.setState({ activity: text });

  handleHeaderChange = (text) => this.setState({ header: text });

  handleDescriptionChange = (text) => this.setState({ description: text });

  handleCityChange = (text) => this.setState({ city: text });

  handleAvailabilityChange = (text) => this.setState({ availability: text });

  handleTimeOfCourseChange = (text) => this.setState({ timeofCourse: text });

  handleLocationChange = (text) => this.setState({ location: text });




  handleSubmit = async () => {



    var user = firebase.auth().currentUser;

    user.updateProfile({

      photoURL: "https://media-exp1.licdn.com/dms/image/C4D03AQH7i_FWmu2SWQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=nNEpmowbG0wdoO4iqtpWTivboVQUsfaRprgezHjWgvQ",
    }).then(function () {
      // Update successful.
      console.log("hei")

    }).catch(function (error) {
      // An error happened.
    });
  }


  handleSave = () => {

    const { price, header, description, seller, city, availability, image, timeofCourse, location } = this.state;
    console.log(seller)

    let selectedTags = this.tag.itemsSelected;
    let activity = []
    for (let t in selectedTags) {
        activity.push(selectedTags[t]["label"])
    }

    this.setState({activity: activity})

    try {
      const reference = firebase
        .database()
        .ref("/activit/")
        .push({ price, activity, header, description, seller, city, availability, image, timeofCourse, location });
      Alert.alert(`Saved`);
      this.setState({
        price: "",
        activity: "",
        header: "",
        description: "",
        city: "",
        availability: "",
        timeofCourse: "",
        location: "",
        

      });
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
    }
  };

  render() {

    this.handleSubmit();

    const { price, header, description, city, availability, timeofCourse, location } = this.state;

    const activity = [
      {id: 1, label: 'Sports'},
      {id: 2, label: 'Food'},
      {id: 3, label: 'Academics'},
      {id: 4, label: 'Language'},
      {id: 5, label: 'Action'},
      
  ];


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={styles.root}>
          <HeaderX
            icon2Family="Feather"
            icon2Name="search"
            style={styles.headerX}
          ></HeaderX>
          <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.background}>
              <ImageBackground
                style={styles.rect2}
                imageStyle={styles.rect2_imageStyle}
                source={require("../Images/bg.jpg")}
              >
                <Text style={styles.text3}>Create Activity</Text>
                <ScrollView style={styles.form}>
                  <View style={styles.nameColumn}>
                    <View style={styles.name}>
                      <FontAwesome5
                        name="dollar-sign"
                        style={styles.icon5}
                      ></FontAwesome5>
                      <TextInput
                        value={price}
                        onChangeText={this.handlePriceChange}
                        placeholder="Price for entire activity"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.nameInput}
                      ></TextInput>
                    </View>

                    <View style={styles.email}>
                      <FontAwesome5
                        name="location-arrow"
                        style={styles.icon5}
                      ></FontAwesome5>
                      <TextInput
                        value={location}
                        onChangeText={this.handleLocationChange}
                        placeholder="Location of activity: My place, your place, outside..."
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.nameInput}
                      ></TextInput>
                    </View>

                    <View style={styles.email}>
                      <FontAwesome5
                        name="clock"
                        style={styles.icon6}
                      ></FontAwesome5>
                      <TextInput
                        value={timeofCourse}
                        onChangeText={this.handleTimeOfCourseChange}
                        placeholder="Duration of entire activity in hours"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.emailInput}
                      ></TextInput>
                    </View>


              
                    <View style={styles.description}>
                      <EntypoIcon
                        name="text"
                        style={styles.icon6}
                      ></EntypoIcon>
                      <TextInput
                        value={description}
                        onChangeText={this.handleDescriptionChange}
                        placeholder="Description"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.emailInput}
                      ></TextInput>

                    </View>
                    <View style={styles.nameColumnFiller}></View>
                    <View style={styles.password}>
                      <FontAwesome5 name="heading" style={styles.icon7}></FontAwesome5>
                      <TextInput
                        value={header}
                        onChangeText={this.handleHeaderChange}
                        placeholder="Heading"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.headerInput}
                      ></TextInput>
                    </View>
                    <View style={styles.city}>
                      <FontAwesome5
                        name="building"
                        style={styles.icon6}
                      ></FontAwesome5>
                      <TextInput
                        value={city}
                        onChangeText={this.handleCityChange}
                        placeholder="City"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.emailInput}
                      ></TextInput>
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={styles.city}>
                      <FontAwesome5
                        name="calendar"
                        style={styles.icon6}
                      ></FontAwesome5>
                      <TextInput
                        value={availability}
                        onChangeText={this.handleAvailabilityChange}
                        placeholder="Fx Weekdays, specific dates, months, weeks, time"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.emailInput}
                      ></TextInput>
                    </KeyboardAvoidingView >
                  </View>
                  
                  <TagSelect
                            theme={'success'}
                            style={styles.input}
                            data={activity}
                            ref={(tag) => {
                                this.tag = tag;
                            }}
                        />

                  <View style={styles.buttonColumn}>
                    <TouchableOpacity
                      onPress={this.handleSave}


                      //  onPress={() => props.navigation.navigate("Timeline")}
                      style={styles.button}
                    >
                      <Text style={styles.text2}>Continue</Text>
                    </TouchableOpacity>
                    <Text style={styles.text4}>Terms &amp; Conditions</Text>
                  </View>


                </ScrollView>
              </ImageBackground>
            </View>
          </View>
        </KeyboardAvoidingView >
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",

  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  progressBar: {
    height: 40,
    flexDirection: "row",
    marginLeft: 28,
    marginRight: 28
  },
  icon2: {
    color: "rgba(30,174,199,1)",
    fontSize: 40,
    width: 33,
    height: 40
  },
  rect4: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 40,
    marginLeft: 6,
    marginTop: 16
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 35,
    width: 40,
    height: 36,
    marginLeft: 4,
    marginTop: 4
  },
  input:{
    marginTop:5,
    paddingTop:4
  },
  rect5: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(230, 230, 230,1)",
    opacity: 0.75,
    borderRadius: 40,
    marginTop: 16
  },
  icon2Row: {
    height: 40,
    flexDirection: "row"
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    width: 34,
    height: 40,
    opacity: 0.75
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 20,
    alignSelf: "center"
  },
  form: {
    height: 230,
    marginTop: 50
  },
  name: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  nameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },

  description: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  emailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  nameColumn: {},
  nameColumnFiller: {
    flex: 1
  },
  password: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  city: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },

  headerInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 18
  },
  progressBarColumn: {
    marginTop: 53,
    marginLeft: 41,
    marginRight: 41
  },
  progressBarColumnFiller: {
    flex: 1
  },
  button: {
    height: 50,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 200,

  },
  text2: {
    width: 66,
    color: "rgba(255,255,255,1)",
    alignSelf: "center",
    top: "0%"
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center"
  },
  buttonColumn: {
    bottom: "-2%",
    marginLeft: 41,
    marginRight: 41
  }
});

