import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";


const CameraModule = (props) => {
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

 return (
     <Modal
       animationType="slide"
       transparent={true}
       visible={true}
       onRequestClose={() => {
         props.setModalVisible();
       }}
     >
       <Camera
         style={{ flex: 1 }}
         flashMode={flash}
         ratio="16:9"
         type={type}
         ref={(ref) => {
           setCameraRef(ref);
         }}
       >
         <View
           style={{
             flex: 1,
             backgroundColor: "transparent",
             justifyContent: "flex-end",
           }}
         >
           <View
             style={{
               backgroundColor: "black",
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
             }}
           >
             <Button
               icon="flash"
               style={{ marginLeft: 12 }}
               mode="outlined"
               color="white"
               onPress={() => {
                 setFlash(
                     flash === Camera.Constants.FlashMode.off
                     ? Camera.Constants.FlashMode.torch
                     : Camera.Constants.FlashMode.off);
               }}
             >
            Flash
             </Button>
            <TouchableOpacity
               onPress={async () => {
                 if (cameraRef) {
                   let photo = await cameraRef.takePictureAsync();
                 
                   props.setImage(photo);
                   props.setModalVisible();
                 }
               }}
             >
               <View
                 style={{
                   borderWidth: 2,
                   borderRadius: 50,
                   borderColor: "white",
                   height: 50,
                   width: 50,
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   marginBottom: 16,
                   marginTop: 16,
                 }}
               >
                 <View
                   style={{
                     borderWidth: 2,
                     borderRadius: 50,
                     borderColor: "white",
                     height: 40,
                     width: 40,
                     backgroundColor: "white",
                   }}
                 ></View>
               </View>
             </TouchableOpacity>
             <Button
               icon="axis-z-rotate-clockwise"
               style={{ marginRight: 12 }}
               mode="outlined"
               color="white"
               onPress={() => {
                 setType(
                   type === Camera.Constants.Type.back
                     ? Camera.Constants.Type.front
                     : Camera.Constants.Type.back
                 );
               }}
             >
            {type === Camera.Constants.Type.back ? "Front" : "Back "}
             </Button>
           </View>
         </View>
       </Camera>
     </Modal>
   );
 };

 export default CameraModule;