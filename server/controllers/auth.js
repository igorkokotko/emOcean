const express = require("express");

const db = require("../models/firebase/auth");

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  db.createUserWithEmailAndPassword(email, password)
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      res.status(400).json({ success: false, data: err.message });
    });
};

exports.test = (req, res, next) => {
  res.status(200).json({ success: true });
};
