import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import ChatBox from './ChatBox';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  {question: 'What is the capital of France?', answer: 'Paris'},
  {question: "Who wrote 'Hamlet'?", answer: 'Shakespeare'},
  {question: 'What is 2 + 2?', answer: '4'},
  {question: 'Which planet is known as the Red Planet?', answer: 'Mars'},
  {question: 'What is the square root of 16?', answer: '4'},
];

const Index = ({route}) => {
  const {username} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  //const [username, setUsername] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnswer(true);
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentQuestionIndex(
          prevIndex => (prevIndex + 1) % questions.length,
        );
      }, 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.section}>
          <View style={styles.SubContainer}>
            <Text style={styles.sectionTitle}>Live Streaming</Text>
            <Text style={styles.usernameText}>Joined in as ID: {username}</Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <Video
              source={require('../../Assets/video.mp4')}
              style={{width: '100%', height: 200}}
              controls={false}
              repeat={true}
              resizeMode="cover"
              paused={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].question}
            </Text>
            {showAnswer && (
              <Text style={styles.answerText}>
                Answer: {questions[currentQuestionIndex].answer}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat Room</Text>
          <ChatBox
            username={username}
            correctAnswer={questions[currentQuestionIndex].answer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  SubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  usernameText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  answerText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
});

export default Index;
