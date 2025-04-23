import React from "react"
import {
  I18nManager,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native"

type CountryListItemProps = {
  item: any;
  handleItemOnClick: (item: any) => void;
  hideCountryFlag: boolean;
  countryNameTextStyle: TextStyle;
  language: string;
}

const CountryListItem = (props: CountryListItemProps) => {
  return (
    <View>
      <Pressable onPress={() => props.handleItemOnClick(props.item)}>
        <View style={styles.listItemView}>
          {!props.hideCountryFlag && (
            <Image
              source={{ uri: props.item.flag }}
              style={styles.countryFlagStyle}
            />
          )}
          <View style={styles.titleView}>
            <Text
              style={[styles.countryNameTextStyle, props.countryNameTextStyle]}
            >
              {props.item.name[props.language ?? "en"]}
              {`(+${props.item.callingCode})`}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
      </Pressable>
    </View>
  );
};

export default CountryListItem;

const styles = StyleSheet.create({
  divider: {
    width: "95%",
    height: 0.8,
    marginHorizontal: 10,
    backgroundColor: "#D3D3D3",
  },

  listItemView: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
  },
  countryNameTextStyle: {
    color: "#000",
    marginLeft: 10,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  countryFlagStyle: {
    width: 35,
    height: 25,
    borderRadius: 3,
  },
});
