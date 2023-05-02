import {
  Animated,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import FlatList = Animated.FlatList;

const HomeScreen = ({ navigation }): JSX.Element => {
  const colors = useTheme().colors;
  const [Items, setItems] = useState([
    { key: 1, item: 'Item #1' },
    { key: 2, item: 'Item #2' },
    { key: 3, item: 'Item #3' },
    { key: 4, item: 'Item #4' },
    { key: 5, item: 'Item #5' },
    { key: 6, item: 'Item #6' },
    { key: 7, item: 'Item #7' },
    { key: 8, item: 'Item #8' },
    { key: 9, item: 'Item #9' }
  ]);
  const [ItemsA, setItemsA] = useState([
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
    { name: 'E' }
  ]);
  const [Refreshing, setRefreshing] = useState(false);

  const DataLI = [
    {
      tile: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3', 'Item 1-4']
    },
    {
      tile: 'Title 2',
      data: ['Item 2-1', 'Item 2-2']
    },
    {
      tile: 'Title 3',
      data: ['Item 3-1', 'Item 3-2', 'Item 3-3']
    }
  ];

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.background
      }}
    >
      {/*<Text style={{ color: colors.text }}>Home Screen Text</Text>*/}
      <View style={styles.view1}>
        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={ItemsA}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ margin: 10 }}>
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={Refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setItems([...Items, { key: 33, item: 'NEW ITEM #33' }]);
                setRefreshing(false);
              }}
              colors={['#63c400']}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {Items.map((object) => {
            return (
              <View style={styles.item} key={object.key}>
                <Text style={{ margin: 10 }}>{object.item}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.view3}>
        <SectionList
          keyExtractor={(item, index) => index.toString()}
          sections={DataLI}
          renderItem={({ item }) => (
          // <View style={styles.item}>
            <Text style={{ margin: 10 }}>{item}</Text>
          // </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={[styles.item, { backgroundColor: '#b109e0' }]}>
              <Text style={{ margin: 10 }}>{section.tile}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ee0707'
  },
  view2: {
    flex: 0.5,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#63c400'
  },
  view3: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e38cb'
  },
  item: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4aa2c5'
  }
});
export default HomeScreen;
