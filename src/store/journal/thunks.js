import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote} from './journalSlice'
import { fileUpload, loadNotes } from '../../helpers';


export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));
        const setDocResp = await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe')
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true})

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {

        dispatch(setSaving());
        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}