(iob_tag) @iob_tag
(chunk_rule) @rule
(chink_rule) @rule
(split_rule) @rule
(merge_rule) @rule

(word_tag) @orange

(any_character) @any_char
(zero_or_more) @quantifier
(one_or_more) @quantifier
(optional) @quantifier

(identity_escape) @escape
(control_letter_escape) @escape
(character_class_escape) @escape
(control_escape) @escape

(start_assertion) @assertion
(end_assertion) @assertion
(boundary_assertion) @assertion
(non_boundary_assertion) @assertion

(lookahead_assertion) @lookahead

(comment) @comment

"(" @punctuation.bracket.group
")" @punctuation.bracket.group
"(?" @punctuation.bracket.group
"(?:" @punctuation.bracket.group
"(?<" @punctuation.bracket.group
"[" @punctuation.bracket.class
"]" @punctuation.bracket.class
