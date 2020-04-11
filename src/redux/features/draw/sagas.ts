import { select, takeEvery, put } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import * as actions from './actions'
import { reset } from '../animation/actions'
import Router from 'next/router'
import { RootState } from '../../rootReducer'
import { drawToSlug } from './services'

function* drawValueWorker() {
  const state: RootState = yield select()
  const slug = drawToSlug(state.draw.draw)
  yield put(reset())
  yield Router.push('/r', `/r#${slug}`)
}

export default function* watchDrawValueAction() {
  yield takeEvery(getType(actions.drawValue), drawValueWorker)
}
