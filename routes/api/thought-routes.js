const router = require('express').Router()
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts)
router.route('/:userId').post(createThought)
router.route('/:thoughtId').get(getThoughtById).put(updateThought)
router.route('/:userId/:thoughtId').delete(deleteThought)
router.route('/:thoughtId/:reactions').post(createReaction)
router.route('/:thoughtId/:reactions/:reactionId').delete(deleteReaction)

module.exports = router