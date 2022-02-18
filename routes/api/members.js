const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get individual member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id} found` });
  }
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: 'Please include name and email' });
  }
  members.push(newMember);
  // res.json(members);
  res.redirect('/');
});

// Update member: updating the data with info passed in request body
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ message: 'Member updated', member });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id} found` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      message: 'Member deleted',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id} found` });
  }
});

module.exports = router;
