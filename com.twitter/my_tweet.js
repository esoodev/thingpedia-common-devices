// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// Copyright 2015-2016 Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See LICENSE for details

const Tp = require('thingpedia');
const Q = require('q');

const SourceBase = require('./source_base');

module.exports = SourceBase(true, function(event, hint) {
    var text = event[0];
    var hashtags = event[1];
    var urls = event[2];
    var inReplyTo = event[4];

    if (hint === 'string-title')
        return "You tweeted.";
    else if (hint === 'string-body')
        return text;
    else
        return 'You tweeted: ' + text;
}, function(tweet, hashtags, urls) {
    var event = [tweet.text,
                 hashtags,
                 urls,
                 tweet.in_reply_to_screen_name ? tweet.in_reply_to_screen_name.toLowerCase() : null];
    this.emitEvent(event);
});
