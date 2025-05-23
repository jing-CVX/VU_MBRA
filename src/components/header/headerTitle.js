/* Header Bar Props
headerTitle: It is used to set the title of the active screen.
headerStyle: It is used to add style to the header bar.
backgroundColor:  It is used to change the background color of the header bar.
headerTintColor: It is used to change the color to the header title.
headerTitleStyle: It is used to add customized style to the header title.
fontWeight: It is used to set the font style of the header title.
headerRight: It is used to add items on the right side of the header bar.
headerLeft: It is used to add items on the left side of the header bar. */
import React from 'react';
import {Text} from 'react-native';
import {fontWeights, fontSizes, color} from '../../styles';

export const HeaderTitle = ({title, title_color, title_size}) => (
  <>
    {title ? (
      <Text
        style={{
          fontSize: title_size ? title_size : fontSizes.normal,
          color: title_color ? title_color : color.LIGHT.BUTTON__TEXT__ACTIVE,
          fontWeight: fontWeights.bold,
          textAlign: 'center',
          backgroundColor:color.LIGHT.BLUE_2
        }}>
        {title}
      </Text>
    ) : undefined}
  </>
);
