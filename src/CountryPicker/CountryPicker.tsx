import React, { useState } from "react"
import {
  FlatList,
  I18nManager,
  ImageSourcePropType,
  ImageStyle,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import CountryJSON from "./countries.json"
import CountryButton from "./CountryButton"
import CountryListItem from "./CountryListItem"
import SearchBar from "./SearchBar"



const CountryPicker = (props: CountryPickerProps) => {
  const [countryJson, setCountryJson] = useState<any[]>(CountryJSON);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const searchByCountryNameCode = (searchText: string) => {
    let filteredJson: any[] = [];
    if (/^-?\d+$/.test(searchText.trim())) {
      filteredJson = CountryJSON.filter((item) => {
        return item.callingCode.startsWith(searchText?.trim());
      });
    } else {
        filteredJson = CountryJSON.filter((item) => {
        const itemData =
          item.name[props.language ?? "en"]?.toUpperCase() || item.name[props.language ?? "en"];
        const queryText = searchText?.trim()?.toUpperCase() || searchText;
        return itemData?.includes(queryText);
      });
    }
    if (searchText.length > 0) {
      setCountryJson([...filteredJson]);
    } else {
      setCountryJson([...CountryJSON]);
    }
  };

  const handleItemOnClick = (item: CountryJsonProps) => {
    setIsModalVisible(false);
    setCountryJson(CountryJSON);
    props.selectedValue && props.selectedValue(item);
  };

  const toggleModal1 = (value: boolean) => {
    setIsModalVisible(value);
  };

  return (
    <View>
      <CountryButton {...props} toggleModal1={toggleModal1} />

      <Modal
        transparent
        visible={isModalVisible}
        animationType={props.animationType}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <Pressable
            style={styles.onPressClose}
            onPress={() => setIsModalVisible(false)}
          />
          <View style={styles.container}>
            <Pressable
              style={styles.closePress}
              onPress={() => {
                setCountryJson(CountryJSON);
                setIsModalVisible(false);
              }}
            >
              <View style={styles.backDropStyle} />
            </Pressable>
            <SearchBar
              {...props}
              searchByCountryNameCode={searchByCountryNameCode}
            />

            <FlatList
              data={countryJson}
              numColumns={1}
              overScrollMode="never"
              initialNumToRender={50}
              style={styles.flatListStyle}
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => (
                <CountryListItem
                  {...item}
                  language={props.language}
                  handleItemOnClick={handleItemOnClick}
                />
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default CountryPicker;

export interface CountryJsonProps {
  id: number;
  countryCode: string;
  currency: string;
  callingCode: string;
  flag: string;
  name: {
    en: string;
    cym?: string;
    deu: string;
    fra: string;
    hrv: string;
    ita: string;
    jpn: string;
    nld: string;
    por: string;
    rus: string;
    spa: string;
    svk: string;
    fin: string;
    zho: string;
    isr: string;
    ar?: string;
  };
}
export interface CountryPickerProps {
  countryId?: number;
  animationType?: "none" | "slide" | "fade" | undefined;
  searchBarContainerStyle?: ViewStyle;
  pickerContainerStyle?: ViewStyle;
  countryNameTextStyle?: TextStyle;
  selectedCountryTextStyle?: TextStyle;
  searchInputStyle?: ViewStyle;
  searchBarPlaceholderTextColor?: string;
  dropDownIcon?: ImageSourcePropType;
  searchIcon?: ImageSourcePropType;
  dropDownIconStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  selectedFlag?: boolean;
  searchBarPlaceHolder?: string;
  disable?: boolean;
  selectedValue?: Function;
  language?:
    | "en"
    | "cym"
    | "deu"
    | "fra"
    | "hrv"
    | "ita"
    | "jpn"
    | "nld"
    | "por"
    | "rus"
    | "spa"
    | "svk"
    | "fin"
    | "zho"
    | "isr"
    | "ar";
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    paddingBottom: 30,
    bottom: -30,
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  onPressClose: {
    flex: 1,
  },
  closePress: {
    alignItems: "center",
    padding: 10,
  },
  selectedCountryTextStyle: {
    color: "#000",
    textAlign: "right",
  },
  countryNameTextStyle: {
    color: "#000",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
  flatListStyle: {
    paddingHorizontal: 15,
  },
  backDropStyle: {
    width: 40,
    height: 3,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});
