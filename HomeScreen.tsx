import {
  Text,
  View,
  Animated,
  StyleSheet,
  SectionList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import FlatList = Animated.FlatList;

const HomeScreen = ({ navigation }): JSX.Element => {
  const [ItemsA, setItemsA] = useState([
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
    { name: 'E' },
  ]);
  const [Refreshing, setRefreshing] = useState(false);

  const DataLI = [
    {
      tile: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3', 'Item 1-4'],
    },
    {
      tile: 'Title 2',
      data: ['Item 2-1', 'Item 2-2'],
    },
    {
      tile: 'Title 3',
      data: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
  ];

  return (
    <SafeAreaView style={styles.homeScreenMain}>
      {/*<Text style={{ color: colors.text }}>Home Screen Text</Text>*/}
      <View style={styles.view1}>
        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={ItemsA}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.margin10}>
                {item.name} - {}
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={Refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setItemsA([...ItemsA, { name: 'NEW ITEM #33' }]);
                setRefreshing(false);
              }}
              colors={['#ee0707']}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.view2}>
        <SectionList
          keyExtractor={(item, index) => index.toString()}
          sections={DataLI}
          renderItem={({ item }) => (
            // <View style={styles.item}>
            <Text style={styles.margin10}>{item}</Text>
            // </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={[styles.item, styles.sectionHeader]}>
              <Text style={styles.margin10}>{section.tile}</Text>
            </View>
          )}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Details', { name: 'Param' })}
        >
          Go to details
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeScreenMain: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '#2ea9a9',
  },
  margin10: {
    margin: 10,
  },
  view1: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ee0707',
  },
  view2: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e38cb',
  },
  sectionHeader: {
    backgroundColor: '#b109e0',
  },
  item: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4aa2c5',
  },
});

export default HomeScreen;
