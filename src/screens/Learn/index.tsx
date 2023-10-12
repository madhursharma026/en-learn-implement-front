import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import COLORS from '../../themes/colors';
import { RootState } from '../../redux/store';
import { Header } from '../../components/Header';
import { STRINGS } from '../../constants/strings';
import QuestionsDetails from '../../components/LearnTab/QuestionsDetails';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { AllQuestions } from '../../graphql/mutations';
import Toast from 'react-native-toast-message';

const Learn = ({ navigation, colors }: { navigation: any; colors: any }) => {
  const [All_Questions] = useMutation(AllQuestions);
  const [allQuestions, setAllQuestions] = React.useState('');

  React.useEffect(() => {
    All_Questions()
      .then(async (res) => {
        setAllQuestions(res.data.questions)
      })
      .catch(error => {
        Toast.show(error?.message);
      });
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: colors.SCREEN_BG_COLOR }]}>
      <Header title={STRINGS.LEARN} navigation={navigation} colors={colors} />
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <FlatList data={allQuestions} renderItem={({ item, index }) =>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("DescriptionScreen", { topicName: `${item.Title}`, topicDescription: `${item.Description}` })}>
              <Text style={styles.topicName}>{index + 1} {item.Title}</Text>
            </TouchableOpacity>
            <View style={styles.hrStyle} />
          </View>
        }
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  const { themeReducer } = state;
  const { themeMode, isDark, colors } = themeReducer;
  return {
    themeMode,
    isDark,
    colors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Learn);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  hrStyle: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  topicName: {
    fontSize: 18,
    paddingTop: 10,
    cursor: 'pointer'
  }
});
