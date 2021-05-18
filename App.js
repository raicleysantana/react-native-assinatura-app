import React, {useRef} from 'react';
import {StyleSheet, View, Button, TouchableOpacity, Text} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

const App = ({onOK}) => {
    const ref = useRef();

    const handleSignature = signature => {
        const path = FileSystem.cacheDirectory + 'sign.png';
        FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: FileSystem.EncodingType.Base64}).then(res => {
            console.log(res);
            FileSystem.getInfoAsync(path, {size: true, md5: true}).then(file => {
                console.log(file);
            })
        }).catch(err => {
            console.log("err", err);
        })
    };

    const handleClear = () => {
        ref.current.clearSignature();
    }

    const handleConfirm = () => {
        ref.current.readSignature();
    }

    const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnLimpar}
                onPress={handleClear}>
                <Text style={styles.label}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnConfirmar}
                onPress={handleConfirm}>
                <Text style={styles.label}>Confirmar</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.campoAssinatura}>
                    <SignatureScreen
                        ref={ref}
                        onOK={handleSignature}
                        webStyle={style}
                        androidHardwareAccelerationDisabled={false}
                    />
                </View>

                <View style={styles.linhaAssinatura}/>
            </View>

        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{rotate: '90deg'}],
        width: '150%',
        position: 'relative',
    },
    row: {
        width: '100%',
    },
    content: {
        marginTop: '30%',
        width: '100%',
        height: '25%',
        position: 'relative'
    },

    linhaAssinatura: {
        borderWidth: 1,
        borderColor: '#999',
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        marginLeft: 15,
        width: '95%',
        margin: 'auto',

    },

    campoAssinatura: {
        borderWidth: 1,
        borderColor: '#444',
        width: '100%',
        height: '100%',
    },
    btnLimpar: {
        width: 100,
        position: 'absolute',
        bottom: '10%',
        left: 10,
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    btnConfirmar: {
        width: 100,
        height: 42,
        position: 'absolute',
        bottom: '10%',
        right: 10,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    label: {
        color: '#FFFFFF',
    }
});