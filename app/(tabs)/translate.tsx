import { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowDownUp } from 'lucide-react-native';

const DUMMY_TRANSLATIONS = {
  'Hello': 'Bonjour',
  'Thank you': 'Merci',
  'Where is the bathroom?': 'Où sont les toilettes?',
};

export default function TranslateScreen() {
  const [inputText, setInputText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('French');
  const [translation, setTranslation] = useState('');

  const handleTranslate = () => {
    // In a real app, you would call a translation API
    // For now, we'll use dummy translations
    setTranslation(DUMMY_TRANSLATIONS[inputText] || 'Translation not available');
  };

  const switchLanguages = () => {
    const tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);
    setInputText(translation);
    setTranslation(inputText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.languageSelector}>
        <Text style={styles.languageText}>{fromLanguage}</Text>
        <TouchableOpacity onPress={switchLanguages} style={styles.switchButton}>
          <ArrowDownUp size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.languageText}>{toLanguage}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Enter text to translate..."
          value={inputText}
          onChangeText={setInputText}
        />
      </View>

      <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
        <Text style={styles.translateButtonText}>Translate</Text>
      </TouchableOpacity>

      {translation ? (
        <View style={styles.translationContainer}>
          <Text style={styles.translationTitle}>Translation:</Text>
          <Text style={styles.translationText}>{translation}</Text>
        </View>
      ) : null}

      <View style={styles.phrasebookContainer}>
        <Text style={styles.phrasebookTitle}>Common Phrases</Text>
        {Object.entries(DUMMY_TRANSLATIONS).map(([phrase, translation]) => (
          <TouchableOpacity
            key={phrase}
            style={styles.phraseCard}
            onPress={() => {
              setInputText(phrase);
              setTranslation(translation);
            }}
          >
            <Text style={styles.phraseText}>{phrase}</Text>
            <Text style={styles.phraseTranslation}>{translation}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  languageText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  switchButton: {
    padding: 10,
  },
  inputContainer: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  translateButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  translationContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  translationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  translationText: {
    fontSize: 18,
  },
  phrasebookContainer: {
    margin: 16,
  },
  phrasebookTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  phraseCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phraseText: {
    fontSize: 16,
    marginBottom: 4,
  },
  phraseTranslation: {
    fontSize: 14,
    color: '#666',
  },
});