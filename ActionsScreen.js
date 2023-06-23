import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const Actions = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [actionBlocks, setActionBlocks] = useState({ 1: [], 2: [] });
  const [orderCount, setOrderCount] = useState(1);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const handleBlockPress = (blockNumber) => {
    setSelectedBlock((prevSelectedBlock) => {
      if (prevSelectedBlock === blockNumber) {
        return null; // Deselect if the block is already selected
      } else {
        return blockNumber; // Select the block
      }
    });

    setSelectedBlocks((prevSelectedBlocks) => {
      const isSelected = prevSelectedBlocks.includes(blockNumber);
      if (isSelected) {
        // Remove the block if it is already selected
        return prevSelectedBlocks.filter((block) => block !== blockNumber);
      } else {
        // Add the block to the selected blocks
        return [...prevSelectedBlocks, blockNumber];
      }
    });
  };

  const handleActionBlockPress = (action, index) => {
    setActionBlocks((prevActionBlocks) => {
      const updatedBlocks = { ...prevActionBlocks };
      updatedBlocks[action].splice(index, 1);
      //  navigation.goBack()
       return updatedBlocks;
    });
    
    
    
  };

  const handleDoneButtonPress = (action) => {
    setActionBlocks((prevActionBlocks) => {
      const updatedBlocks = { ...prevActionBlocks };
      const blockNumbers = Object.values(updatedBlocks).flatMap(items =>
        items.filter(item => item.blockName.startsWith("Block")).map(item => item.blockNumber)
      );
      // console.log(blockNumbers);
      return blockNumbers;
    });
    setSelectedBlocks([]);
    // navigator.navigate('Scratch Editor')
  };

  const handleAddToAction = (action) => {
    if (selectedBlock) {
      const blockName = `Block ${selectedBlock}`;
      setActionBlocks((prevActionBlocks) => {
        const updatedBlocks = { ...prevActionBlocks };
        updatedBlocks[action] = [
          ...updatedBlocks[action],
          { blockNumber: selectedBlock, blockName, order: orderCount },
        ];
        return updatedBlocks;
      });
      setSelectedBlock(null);
      setOrderCount((prevOrderCount) => prevOrderCount + 1);
    }
  };

  const renderBlocks = () => {
    const blocks = [];
    const blockNames = [
      'Move X by 50',
      'Say Hello',
      'Wait 1 sec',
      'Broadcast Done',
      'Move Y by 50',
      'Think Hmm',
      'Repeat 1 time',
      'Increase size',
      'Turn 15 degrees ↻',
      'Reply Ok',
      'Repeat',
      'Decrease Size',
    ];
    for (let i = 1; i <= 12; i++) {
      const blockName = `Block ${i}`;
      blocks.push(
        <TouchableOpacity
          key={i}
          style={[styles.block, selectedBlock === i && styles.selectedBlock]}
          onPress={() => handleBlockPress(i)}
        >
          <Text style={styles.heading}>
            {selectedBlock === i ? blockName : blockNames[i - 1]}
          </Text>
        </TouchableOpacity>
      );
    }
    return blocks;
  };
  

  const renderActionBlocks = (action) => {
    return actionBlocks[action].map((block, index) => (
      <View key={index} style={styles.actionBlockContainer}>
        <TouchableOpacity
          style={styles.actionBlock}
          onPress={() => handleActionBlockPress(action, index)}
        >
          <Text style={styles.actionBlockText}>{`${block.blockName}`}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.columnHeading}>
          <Text style={styles.headingText}>Motion</Text>
          <Text style={styles.headingText}>Look</Text>
          <Text style={styles.headingText}>Control</Text>
          <Text style={styles.headingText}>Events</Text>
        </View>
        <View style={styles.grid}>{renderBlocks()}</View>
        <View style={styles.actionContainer}>
          <View style={styles.actionColumn}>
            <Text style={styles.actionColumnText}>Action 1</Text>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAddToAction(1)}
              >
                <Text style={styles.actionButtonText}>Add to Action 1</Text>
              </TouchableOpacity>
              {actionBlocks[1].length > 0 && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => handleDoneButtonPress(1)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.actionBlocksContainer}>
              {renderActionBlocks(1)}
            </View>
          </View>
          <View style={styles.actionColumn}>
            <Text style={styles.actionColumnText}>Action 2</Text>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAddToAction(2)}
              >
                <Text style={styles.actionButtonText}>Add to Action 2</Text>
              </TouchableOpacity>
              {actionBlocks[2].length > 0 && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => handleDoneButtonPress(2)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.actionBlocksContainer}>
              {renderActionBlocks(2)}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  columnHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  block: {
    width: '25%',
    height: 100,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightsalmon',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedBlock: {
    backgroundColor: 'lightblue',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  actionColumnText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  doneButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  actionBlocksContainer: {
    flexDirection: 'column',
  },
  actionBlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBlock: {
    flex: 1,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  actionBlockText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Actions;
