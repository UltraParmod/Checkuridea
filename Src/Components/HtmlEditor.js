
import React from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import { hp, wp } from '../Utails/Responsive';



// const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const HtmlEditor = ({ parentCallback, value }) => {
    console.log(value)
    const richText = React.useRef();
    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            console.log('Imagemime', image)
            convertBase64(image)
        })
    }
    const convertBase64 = (image) => {
        ImgToBase64.getBase64String(image.path)
            .then(base64String => {
                const str = `data:${image.mime};base64,${base64String}`;
                richText.current.insertImage(str)
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={{}}>
            <RichToolbar
                style={{ backgroundColor: 'rgba(0,0,0,0.0)', width: '86%', }}
                // editor={richText}
                actions={[
                    // actions.insertImage,
                    // actions.insertVideo,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.keyboard,
                    actions.setStrikethrough,
                    actions.setUnderline,
                    actions.removeFormat,
                    actions.checkboxList,
                    actions.undo,
                    actions.redo,
                ]}
                onPressAddImage={() => {
                    pickImage()
                }}
            // iconMap={{ [actions.heading1]: handleHead }}
            />
            <ScrollView>


                <RichEditor
                    scrollEnabled={true}
                    style={{ marginTop: hp(-.5), minHeight: hp(100) }}
                    ref={richText}
                    initialContentHTML={`${value ? value :''}`}
                    onChange={descriptionText => parentCallback(descriptionText)}
                />




            </ScrollView>
        </View>
    );
};

export default HtmlEditor;
