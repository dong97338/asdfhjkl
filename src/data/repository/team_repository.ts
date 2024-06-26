import CodeResponse from '@/app/code_response'
import {
	doc,
	collection,
	setDoc,
	getDocs,
	query,
	where,
	limit,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Result } from '@/app/types'

export default class TeamRepository {
	// async upload(questionData: Question): Promise<CodeResponse> {
	// 	try {
	// 		// const time = new Date()
	// 		const newQuestion = new QuestionModel(
	// 			questionData.content,
	// 		).toObject()

	// 		const docRef = doc(collection(db, 'questions'))
	// 		await setDoc(docRef, newQuestion)
	// 		return new CodeResponse(
	// 			Result.SUCCESS,
	// 			'DATA_QR_UPLOAD_SUCCESS',
	// 			docRef.id,
	// 		)
	// 	} catch (error) {
	// 		return new CodeResponse(Result.ERROR, 'DATA_QR_UPLOAD_FAIL', error)
	// 	}
	// }

	async read(teamId: string): Promise<CodeResponse> {
		try {
			const docRef = doc(db, 'team', teamId)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) {
				return new CodeResponse(
					Result.ERROR,
					'DATA_QR_READ_FAIL',
					'No such document!',
				)
			}
			return new CodeResponse(Result.SUCCESS, 'DATA_QR_READ_SUCCESS', {
				id: docSnap.id,
				...docSnap.data(),
			})
		} catch (error) {
			return new CodeResponse(Result.ERROR, 'DATA_QR_READ_FAIL', error)
		}
	}
	async updateLastQuestionId(
		teamId: string,
		lastQuestionId: string,
	): Promise<CodeResponse> {
		try {
			const docRef = doc(db, 'team', teamId)
			await updateDoc(docRef, {
				lastQuestionId: lastQuestionId,
				answeredUserList: [],
			})
			return new CodeResponse(
				Result.SUCCESS,
				'DATA_QR_UPDATE_SUCCESS',
				'Last question ID updated successfully',
			)
		} catch (error) {
			return new CodeResponse(Result.ERROR, 'DATA_QR_UPDATE_FAIL', error)
		}
	}
}
