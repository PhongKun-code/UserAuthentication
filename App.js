import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Card, Title, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import 'intl-pluralrules';

// Cấu hình i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          register: "Register",
          login: "Login",
          username: "Username",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          switchToLogin: "Switch to Login",
          switchToRegister: "Switch to Register",
          strongPassword: "Password must be at least 8 characters long, contain a number, and a special character.",
          passwordsDoNotMatch: "Passwords do not match.",
          invalidEmail: "Invalid email address.",
          accountNotFound: "Account does not exist.",
          incorrectPassword: "Incorrect password.",
          forgotPassword: "Forgot Password?",
          rememberMe: "Remember Me"
        }
      },
      vi: {
        translation: {
          register: "Đăng Ký",
          login: "Đăng Nhập",
          username: "Tên Người Dùng",
          email: "Email",
          password: "Mật Khẩu",
          confirmPassword: "Xác Nhận Mật Khẩu",
          switchToLogin: "Chuyển sang Đăng Nhập",
          switchToRegister: "Chuyển sang Đăng Ký",
          strongPassword: "Mật khẩu phải có ít nhất 8 ký tự, chứa số và ký tự đặc biệt.",
          passwordsDoNotMatch: "Mật khẩu không khớp.",
          invalidEmail: "Email không hợp lệ.",
          accountNotFound: "Tài khoản không tồn tại.",
          incorrectPassword: "Mật khẩu không chính xác.",
          forgotPassword: "Quên Mật Khẩu?",
          rememberMe: "Ghi Nhớ Mật Khẩu"
        }
      }
    },
    lng: "vi",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

const AuthScreen = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };

  const handleSubmit = () => {
    if (isSignUp && !username) {
      Alert.alert('Lỗi', t('username') + ' không được để trống.');
      return;
    }

    if (!validateEmail()) {
      Alert.alert('Lỗi', t('invalidEmail'));
      return;
    }

    if (!validatePassword()) {
      Alert.alert('Lỗi', t('strongPassword'));
      return;
    }

    if (isSignUp && !validateConfirmPassword()) {
      Alert.alert('Lỗi', t('passwordsDoNotMatch'));
      return;
    }

    const accountExists = true; // Giả định tài khoản tồn tại
    const passwordCorrect = true; // Giả định mật khẩu đúng

    if (!accountExists) {
      Alert.alert('Lỗi', t('accountNotFound'));
      return;
    }

    if (!passwordCorrect) {
      Alert.alert('Lỗi', t('incorrectPassword'));
      return;
    }

    Alert.alert('Thành công', isSignUp ? t('register') + ' thành công!' : t('login') + ' thành công!');
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
  <Card.Content>
    <Title style={styles.title}>{isSignUp ? t('register') : t('login')}</Title>
    {isSignUp && (
      <TextInput
        label={t('username')}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        left={<TextInput.Icon name={() => <Icon name="account" size={20} />} />} 
      />
    )}
    <TextInput
      label={t('email')}
      value={email}
      onChangeText={setEmail}
      style={styles.input}
      keyboardType="email-address"
      left={<TextInput.Icon name={() => <Icon name="email" size={20} />} />} 
    />
    <TextInput
      label={t('password')}
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={setPassword}
      style={styles.input}
      left={<TextInput.Icon name={() => <Icon name="lock" size={20} />} />} 
      right={
        <TextInput.Icon
          name={() => <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />} 
          onPress={() => setShowPassword(!showPassword)}
        />
      }
    />
    {isSignUp && (
      <TextInput
        label={t('confirmPassword')}
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        left={<TextInput.Icon name={() => <Icon name="lock" size={20} />} />} 
        right={
          <TextInput.Icon
            name={() => <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} />} 
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
    )}
    <View style={styles.rememberMeContainer}>
      <Checkbox
        status={rememberMe ? 'checked' : 'unchecked'}
        onPress={() => setRememberMe(!rememberMe)}
      />
      <Text>{t('rememberMe')}</Text>
    </View>
    <Button
      mode="contained"
      onPress={handleSubmit}
      style={styles.button}
    >
      {isSignUp ? t('register') : t('login')}
    </Button>
    <Button
      mode="text"
      onPress={() => setIsSignUp(!isSignUp)}
      style={styles.switchButton}
    >
      {isSignUp ? t('switchToLogin') : t('switchToRegister')}
    </Button>

    <Button
      mode="text"
      onPress={() => Alert.alert(t('forgotPassword'), 'Link to reset password will be sent to your email.')}
      style={styles.forgotPasswordButton}
    >
      {t('forgotPassword')}
    </Button>

    <View style={styles.languageSelector}>
      <Button onPress={() => handleLanguageChange('en')}>English</Button>
      <Button onPress={() => handleLanguageChange('vi')}>Tiếng Việt</Button>
    </View>
  </Card.Content>
</Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'pink',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    borderRadius: 25,
     // Màu nền ô nhập
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
  },
  switchButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  checkbox: {
    color: '#669933', // Thay đổi màu checkbox
  },
  icon: {
    color: '#669933', // Thay đổi màu icon
  },
});

export default AuthScreen;
