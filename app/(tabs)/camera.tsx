import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Switch } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Speech from 'expo-speech';
import { Camera as CameraIcon, Camera as FlipCamera, Volume2, VolumeX } from 'lucide-react-native';
import { analyzeImage } from '@/services/visionApi';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [speakResults, setSpeakResults] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, []);

  const analyzePlaceAndSpeak = async () => {
    if (isAnalyzing || !cameraRef.current) return;

    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.8,
        exif: false,
      });

      const description = await analyzeImage(photo.base64);
      setAnalysisResult(description);

      if (speakResults) {
        await Speech.speak(description, {
          language: 'en',
          pitch: 1,
          rate: 0.9,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'Sorry, I encountered an error while analyzing the image.';
      setAnalysisResult(errorMessage);
      if (speakResults) {
        Speech.speak(errorMessage);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.messageContainer}>
        <CameraIcon size={48} color="#666" />
        <Text style={styles.messageText}>
          Camera feature is only available on mobile devices
        </Text>
        <Text style={styles.messageSubtext}>
          Please use our mobile app to access the camera functionality
        </Text>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.messageContainer}>
        <CameraIcon size={48} color="#666" />
        <Text style={styles.messageText}>No access to camera</Text>
        <Text style={styles.messageSubtext}>
          Please enable camera access in your device settings to use this feature
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        ratio="16:9"
      >
        <View style={styles.controls}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
            >
              <FlipCamera size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.speakToggle}
              onPress={() => setSpeakResults(!speakResults)}
            >
              {speakResults ? (
                <Volume2 size={24} color="#FFFFFF" />
              ) : (
                <VolumeX size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          {analysisResult && !isAnalyzing && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{analysisResult}</Text>
            </View>
          )}
          
          <TouchableOpacity
            style={[styles.captureButton, isAnalyzing && styles.buttonDisabled]}
            onPress={analyzePlaceAndSpeak}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <CameraIcon size={30} color="#FFFFFF" />
            )}
            {isAnalyzing && <Text style={styles.analyzingText}>Analyzing...</Text>}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  messageSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  flipButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  speakToggle: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  captureButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  analyzingText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});