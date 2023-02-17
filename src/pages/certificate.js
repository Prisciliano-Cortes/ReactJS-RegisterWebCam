import React from 'react';
import { logoutFirebase } from '../firebase/provider';
import { useUserContext } from '../context/userContext';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export const Certificate = () => {

    const { user } = useUserContext();

    const userActive = user.displayName;

    const MyDocument = ({ name }) => (
            <Document>
                <Page style={styles.page} size="A4" orientation='landscape'>
                    <View style={styles.section}>
                        <Text>Diploma of participation</Text>
                    </View>
                    <View style={styles.section}>
                        <Text> {name} </Text>
                    </View>
                </Page>
            </Document>
    ); 

    const logout = async() => {
        await logoutFirebase();
    };

    return (
        <>
            <div className='pt-20 flex items-center justify-center'>
                <div>
                    <p className='text-center'> Hello: { userActive} </p>
                    <br /><br />

                    <PDFDownloadLink
                        document={MyDocument({ name : userActive })}
                        fileName={`certificate-${userActive}`}
                    >
                        {({ url }) => (
                            <button 
                                href={url} 
                                target="_blank"
                                className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                            >  
                                get my certificate
                            </button>               
                        )}
                    </PDFDownloadLink> 

                    <button
                        onClick={logout}
                        className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
