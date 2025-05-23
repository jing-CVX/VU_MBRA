import React, { memo } from "react";
import { Dimensions } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
// Import ultils -----------
import { screens } from "../utils";
import { IOS } from "../styles/helper/dimensions";
import TabNavigator from "./TabNavigator";
import { color } from "../styles";
// ********************
import LoginScreen from "../layouts/authen/login";
import ModalAlertScreen from "./ModalAlert";

import DemoScreen from "../layouts/demo/demo";
import EmployeeScreen from "../layouts/employee/employee";
import ContractingScreen from "../layouts/contracting/contracting";
import PurchasingScreen from "../layouts/purchasing/purchasing";
import RequestResponseScreen from "../layouts/request-response/request-response";
import FeedbackScreen from "../layouts/request-response/feedback/feedback";
import ContractScreen from "../layouts/contract/contract";
import ContractDetailScreen from "../layouts/contract/list/screen-detail/screen-detail";
import DetailReceiveScreen from "../layouts/request-response/receive/screen-receive-detail/screen-receive-detail";
import DetailRequestScreen from "../layouts/request-response/request/screen-request-detail/screen-request-detail";

const { width } = Dimensions.get("window");
/*-- ứng dụng được chia ra thành 3 lớp navigator sau:
1 - TabNavigator: Chứa các màn hình nghiệp vụ chính, nằm trên tab bottom của ứng dụng
2 - AppStackNavigator: Chứa TabNavigator và all màn hình dạng stack của ứng dụng
3 - RootStackScreen: Chứa AppStackNavigator và các màn hình dạng RootStack - lớp ngoài cùng phục vụ cho việc dùng chung, vd như các màn hình thông báo chung của hệ thống
*/

const Stack = createNativeStackNavigator();
function AppStackNavigatorMemo() {
  //-- Định nghĩa 2 loại header (option) màn hình hay sử dụng
  const commonOptionScreen = {
    headerShown: false,
    gestureResponseDistance: { horizontal: width },
    cardStyleInterpolator: IOS
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forScaleFromCenterAndroid,
  };
  return (
    <Stack.Navigator
      initialRouteName={"TABNAV"}
      // screenOptions={{
      //   //headerTintColor: color.LIGHT.BLUE_2,
      //   //headerTitleAlign: "center",
      //   //headerBackVisible: false,

      //   headerShown: false,
      // }}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        headerTintColor: color.LIGHT.WHITE,
      })}
    >
      <Stack.Screen
        name={screens.DemoScreen}
        component={DemoScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.ContractScreen}
        component={ContractScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.ContractDetailScreen}
        component={ContractDetailScreen}
        options={{ headerShown: true }}
      />


      <Stack.Screen
        name={screens.MANAGER_ACCOUNT}
        component={EmployeeScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name={screens.CONTRACTING}
        component={ContractingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.PURCHASING}
        component={PurchasingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.REQUEST_RESPONSE}
        component={RequestResponseScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name={screens.DetailReceiveScreen}
        component={DetailReceiveScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name={screens.DetailRequestScreen}
        component={DetailRequestScreen}
        options={{ headerShown: true }}
      />


      
      <Stack.Screen
        name={screens.FEEDBACK}
        component={FeedbackScreen}
        options={{ headerShown: true }}
      />


      <Stack.Screen
        name={"TABNAV"}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.LOGIN}
        component={LoginScreen}
        options={commonOptionScreen}
      />
    </Stack.Navigator>
  );
}
const AppStackNavigator = memo(AppStackNavigatorMemo, () => true);

//-- Stack gốc của ứng dụng
const RootStack = createStackNavigator();
function RootStackScreen() {
  //   const {styles, theme} = useContext(StoreContext);
  //-----------------------------
  return (
    <>
      {/* <MessageErrorNetwork /> */}
      {/* <NotifyGlobal /> */}
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            ...DefaultTheme.colors,
            background: color.LIGHT.PRIMARY__BG__COLOR,
            card: color.LIGHT.SECOND__BG__COLOR,
          },
        }}
      >
        <RootStack.Navigator>
          {/* <RootStack.Group> */}
          <RootStack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={AppStackNavigator}
          />
          {/* </RootStack.Group>
          <RootStack.Group> */}
          <RootStack.Screen
            name={screens.ALERT_MODAL}
            component={ModalAlertScreen}
            options={{
              headerShown: false,
              animationEnabled: false,
              presentation: "transparentModal",
              cardStyle: { backgroundColor: "#00000000" },
              cardOverlayEnabled: true,
              // ...TransitionPresets.ModalSlideFromBottomIOS,
              CardStyleInterpolator: ({ current: { progress } }) => {
                return {
                  cardStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: [0, 0.25, 0.7, 1],
                    }),
                  },
                  overlayStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.25],
                      extrapolate: "clamp",
                    }),
                  },
                };
              },
            }}
          />
          {/* </RootStack.Group> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
const RootStackScreenMemo = memo(RootStackScreen, areEqual);
function areEqual(prev, next) {
  return true;
}

export default RootStackScreenMemo;
