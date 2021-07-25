const quantifierRule = prefix => $ => seq(
  prefix($),
  optional(alias('?', $.lazy))
)

const SYNTAX_CHARS = [
  ...'^$\\.*+?()[]|'
]

const SYNTAX_CHARS_ESCAPED = SYNTAX_CHARS.map(
  char => `\\${char}`
).join('')

module.exports = grammar({
  name: 'chunkgrammar',

  extras: $ => [
    $.iob_tag,
    $.comment,
    /\n/
  ],

  inline: $ => [
    $.character_escape,
    $.class_atom,
  ],

  rules: {

    ruleset: $ => seq(
      $.iob_tag,
      repeat1(choice(
        $.chunk_rule,
        $.chink_rule,
        $.split_rule,
        $.merge_rule
      ))
    ),

    iob_tag: $ => /\n[-A-Za-z0-9\.]+:\n/,

    chunk_rule: $ => prec.left(seq(
      repeat($.word_tag),
      '{',
      repeat1($.word_tag),
      '}',
      repeat($.word_tag),
    )),

    chink_rule: $ => prec.left(seq(
      repeat($.word_tag),
      '}',
      repeat1($.word_tag),
      '{',
      repeat($.word_tag),
    )),

    split_rule: $ => prec.left(seq(
      repeat1($.word_tag),
      '}{',
      repeat1($.word_tag),
    )),

    merge_rule: $ => prec.left(seq(
      repeat1($.word_tag),
      '{}',
      repeat1($.word_tag),
    )),

    pattern: $ => choice(
      $.disjunction,
      $.term,
      $.word_tag
    ),

    word_tag: $ => seq(
      '<',
      choice(
        $.disjunction,
        $.term,
      ),
      '>',
      optional(choice(
        $.zero_or_more,
        $.one_or_more,
        $.optional
      ))
    ),

    disjunction: $ => seq(
      optional($.term),
      repeat1(seq('|', optional($.term)))
    ),

    term: $ => repeat1(seq(
      choice(
        $.start_assertion,
        $.end_assertion,
        $.boundary_assertion,
        $.non_boundary_assertion,
        $.lookahead_assertion,
        $.pattern_character,
        $.character_class,
        $.any_character,
        $.decimal_escape,
        $.character_class_escape,
        $.character_escape,
        $.backreference_escape,
        $.anonymous_capturing_group,
        $.non_capturing_group,
      ),
      optional(choice(
        $.zero_or_more,
        $.one_or_more,
        $.optional
      ))
    )),

    any_character: $ => '.',

    start_assertion: $ => '^',
    end_assertion: $ => '$',
    boundary_assertion: $ => '\\b',
    non_boundary_assertion: $ => '\\B',
    lookahead_assertion: $ => seq(
      '(?',
      choice('=', '!', '<=', '<!'),
      $.pattern,
      ')'
    ),

    pattern_character: $ => new RegExp(`[^${SYNTAX_CHARS_ESCAPED}\\n]`),

    character_class: $ => seq(
      '[',
      optional('^'),
      repeat(choice(
        $.class_range,
        $.class_atom
      )),
      ']'
    ),

    class_range: $ => prec.right(1,
      seq($.class_atom, '-', $.class_atom)
    ),

    class_atom: $ => choice(
      alias('-', $.class_character),
      $.class_character,
      alias('\\-', $.identity_escape),
      $.character_class_escape,
      $.character_escape,
    ),

    class_character: $ => /[^\\\]\-]/,

    anonymous_capturing_group: $ => prec(1, seq('(', $.pattern, ')')),

    non_capturing_group: $ => seq('(?:', $.pattern, ')'),

    zero_or_more: quantifierRule($ => '*'),
    one_or_more: quantifierRule($ => '+'),
    optional: quantifierRule($ => '?'),

    backreference_escape: $ => seq('\\', $.group_name),

    decimal_escape: $ => /\\[1-9][0-9]+/,

    character_class_escape: $ => /\\[dDsSwW]/,

    character_escape: $ => choice(
      $.control_escape,
      $.control_letter_escape,
    ),

    control_escape: $ => /\\[bfnrtv0]/,

    control_letter_escape: $ => /\\c[a-zA-Z]/,

    group_name: $ => /[A-Za-z0-9]+/,

    decimal_digits: $ => /\d+/,

    comment: $ => token(seq('#', /.*/)),

  }
})
