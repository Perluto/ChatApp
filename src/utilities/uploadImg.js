import storage from '@react-native-firebase/storage';

export default uploadImg = async (img, ref) => {
  const reference = storage().ref(ref);
  await reference.putFile(img.uri);
  const url = await storage().ref(ref).getDownloadURL();
  return url;
};
