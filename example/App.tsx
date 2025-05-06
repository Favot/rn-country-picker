import React, { useState } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import CountryPicker from "rn-country-picker"

type SelectedValueProps = {
  callingCode: string
  countryCode: string
  currency: string
  flag: string
  id: number
}

const App = () => {
  const [countryCode, setCountryCode] = useState<string>("91")

  const selectedValue = (value: SelectedValueProps) => {
    setCountryCode(value?.callingCode)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native Country Picker</Text>

      <CountryPicker
        animationType={"slide"}
        language="en"
        searchBarPlaceholderTextColor={"#ff0"}
        searchInputStyle={{ marginTop: 10 }}
        countryCode={countryCode}
        selectedValue={selectedValue}
      />
    </View>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  titleText: {
    color: "#000",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold",
  },
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
  },
  pickerStyle: {
    height: 54,
    width: 150,
    marginVertical: 10,
    borderColor: "#303030",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 16,
    color: "#000",
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: "#000",
    textAlign: "right",
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right",
  },

  searchBarStyle: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: Platform.OS === "ios" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,1)",
    borderRadius: 10,
    elevation: 5,
  },
})
