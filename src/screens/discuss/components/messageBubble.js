// Import react
import React from "react";

// Import react-native components
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import HTML from "react-native-render-html";

// Import react-native-svg
// from 'https://github.com/react-native-community/react-native-svg'
import Svg, { Path } from "react-native-svg";

// Import react-native-size-matters
// from 'https://github.com/nirsky/react-native-size-matters'
import { moderateScale } from "react-native-size-matters";

// Props info list
// 1. mine (bool) => renders blue bubble on right
// 2. text (string) => renders text message
// 3. image (image file) => renders image inside bubble

// Declare component
const MessageBubble = (props) => {
  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, 500);
  };
  return (
    <View style={[styles.message, props.mine ? styles.mine : styles.not_mine]}>
      <View
        style={[
          styles.cloud,
          {
            backgroundColor: !props.mine ? "#dddddd" : "#7c7bad",
          },
        ]}>
        {props.image ? (
          <Image
            style={{
              alignSelf: !props.mine ? "flex-start" : "flex-end",
            }}
            borderRadius={10}
            source={props.image}
          />
        ) : null}

        {props.mine ? (
          <View style={styles.box}>
            {props.author ? (
              <Text style={styles.author_text}>{props.author}</Text>
            ) : null}
            {props.avatar ? (
              <View>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `data:image/png;base64,${props.avatar}`,
                  }}
                />
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.box}>
            {props.avatar ? (
              <View>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `data:image/png;base64,${props.avatar}`,
                  }}
                />
              </View>
            ) : null}
            {props.author ? (
              <Text style={styles.author_text}>{props.author}</Text>
            ) : null}
          </View>
        )}
        {props.subject ? (
          <Text style={styles.subject_text}>Subject: {props.subject}</Text>
        ) : null}
        {props.text ? (
          <Text
            style={[
              styles.text,
              {
                color: !props.mine ? "black" : "white",
              },
            ]}>
            {props.text}
          </Text>
        ) : // <HTML
        //   source={{ html: props.text }}
        //   contentWidth={contentWidth}
        //   computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
        //   style={[
        //     styles.text,
        //     {
        //       color: !props.mine ? "black" : "white",
        //     },
        //   ]}
        // />
        null}

        <Text
          style={[
            styles.date_text,
            {
              color: !props.mine ? "black" : "white",
            },
          ]}>
          {props.date}
        </Text>

        <View
          style={[
            styles.arrow_container,
            !props.mine
              ? styles.arrow_left_container
              : styles.arrow_right_container,
          ]}>
          <Svg
            style={!props.mine ? styles.arrow_left : styles.arrow_right}
            width={moderateScale(15.5, 0.6)}
            height={moderateScale(17.5, 0.6)}
            viewBox="32.484 17.5 15.515 17.5"
            enable-background="new 32.485 17.5 15.515 17.5">
            <Path
              d={
                !props.mine
                  ? "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                  : "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
              }
              fill={!props.mine ? "#dddddd" : "#7c7bad"}
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  message: {
    flexDirection: "row",
    marginVertical: moderateScale(7, 2),
  },
  not_mine: {
    marginLeft: 20,
  },
  mine: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  cloud: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: 13,
    lineHeight: 22,
  },
  date_text: {
    paddingTop: 3,
    fontSize: 11,
    lineHeight: 22,
  },
  author_text: {
    paddingTop: 3,
    fontSize: 11,
    lineHeight: 22,
    alignSelf: "flex-end",
  },
  subject_text: {
    paddingTop: 3,
    fontSize: 15,
    lineHeight: 22,
  },
  arrow_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrow_left_container: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  arrow_right_container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
  avatar: {
    borderRadius: 20,
    width: 30,
    height: 30,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
