/* description: Parses end evaluates mathematical expressions. */
/* lexical grammar */
/* TODO: define grammar and handlers for cell and time */
%lex
%%
\s+									                                                            {/* skip whitespace */}
'"'("\\"["]|[^"])*'"'				                                                    {return 'STRING';}
"'"('\\'[']|[^'])*"'"				                                                    {return 'STRING';}
[A-Za-z]{1,}[A-Za-z_0-9]+(?=[(])                                                {return 'FUNCTION';}
([0]?[1-9]|1[0-2])[:][0-5][0-9]([:][0-5][0-9])?[ ]?(AM|am|aM|Am|PM|pm|pM|Pm)		{return 'TIME_AMPM';}
([0]?[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]([:][0-5][0-9])?        									{return 'TIME_24';}
'$'[A-Za-z]+'$'[0-9]+                                                           {
	                                                                                if (yy.obj.type == 'cell') return 'FIXEDCELL';
                                                                                  return 'VARIABLE';
                                                                                }
[A-Za-z]+[0-9]+                                                                 {
                                                                                  if (yy.obj.type == 'cell') return 'CELL';
                                                                                  return 'VARIABLE';
                                                                                }
[A-Za-z]+(?=[(])    				                                                    {return 'FUNCTION';}
[A-Za-z]{1,}[A-Za-z_0-9]+			                                                  {return 'VARIABLE';}
[A-Za-z_]+           				                                                    {return 'VARIABLE';}
[0-9]+          			  		                                                    {return 'NUMBER';}
"$"									                                                            {/* skip whitespace */}
"&"                                                                             {return '&';}
" "									                                                            {return ' ';}
[.]									                                                            {return 'DECIMAL';}
":"									                                                            {return ':';}
";"									                                                            {return ';';}
","									                                                            {return ',';}
"*" 								                                                            {return '*';}
"/" 								                                                            {return '/';}
"-" 								                                                            {return '-';}
"+" 								                                                            {return '+';}
"^" 								                                                            {return '^';}
"(" 								                                                            {return '(';}
")" 								                                                            {return ')';}
"[" 								                                                            {return '[';}
"]" 								                                                            {return ']';}
">" 								                                                            {return '>';}
"<" 								                                                            {return '<';}
"NOT"								                                                            {return 'NOT';}
'"'									                                                            {return '"';}
"'"									                                                            {return "'";}
"!"									                                                            {return "!";}
"="									                                                            {return '=';}
"%"									                                                            {return '%';}
[#]									                                                            {return '#';}
<<EOF>>								                                                          {return 'EOF';}
/lex

/* operator associations and precedence (low-top, high- bottom) */
%left '='
%left '<=' '>=' '<>' 'NOT' '||'
%left '>' '<'
%left '+' '-'
%left '*' '/'
%left '^'
%left '&'
%left '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : expression EOF {
        return $1;
    }
;

expression
    : variableSequence {
        $$ = ruleJS.helper.callVariable.call(this, $1);
      }
    | TIME_AMPM {
        $$ = yy.handler.time.call(yy.obj, $1, true);
      }
    | TIME_24 {
        $$ = yy.handler.time.call(yy.obj, $1);
      }
    | number {
        $$ = ruleJS.helper.number($1);
      }
    | STRING {
        $$ = $1.substring(1, $1.length - 1);
      }
    | expression '&' expression {
        $$ = $1.toString() + $3.toString();
      }
    | expression '=' expression {
        {$$ = $1 == $3}
      }
    | expression '+' expression {
        $$ = ruleJS.helper.mathMatch('+', $1, $3);
      }
    | '(' expression ')' {
        $$ = ruleJS.helper.number($2);
      }
    | expression '<' '=' expression {
        {$$ = $1 <= $4}
      }
    | expression '>' '=' expression {
        {$$ = $1 >= $4}
      }
	  | expression '<' '>' expression {
        $$ = ($1) != ($4);
        if (isNaN($$)) {
            $$ = 0;
        }
      }
    | expression NOT expression {
          $$ = $1 != $3;
      }
    | expression '>' expression {
        {$$ = $1 > $3}
      }
    | expression '<' expression {
        {$$ = $1 < $3}
      }
    | expression '-' expression {
        $$ = ruleJS.helper.mathMatch('-', $1, $3);
      }
    | expression '*' expression {
        $$ = ruleJS.helper.mathMatch('*', $1, $3);
      }
    | expression '/' expression {
        $$ = ruleJS.helper.mathMatch('/', $1, $3);
      }
    | expression '^' expression {
        var n1 = ruleJS.helper.number($1),
            n2 = ruleJS.helper.number($3);

        $$ = ruleJS.helper.mathMatch('^', $1, $3);
      }
    | '-' expression {
        var n1 = ruleJS.helper.numberInverted($2);
        $$ = n1;
        if (isNaN($$)) {
            $$ = 0;
        }
      }
    | '+' expression {
        var n1 = ruleJS.helper.number($2);
        $$ = n1;
        if (isNaN($$)) {
            $$ = 0;
        }
      }
    | FUNCTION '(' ')' {
        $$ = ruleJS.helper.callFunction.call(this, $1, '');
      }
    | FUNCTION '(' expseq ')' {
        $$ = ruleJS.helper.callFunction.call(this, $1, $3);
      }
    | cell
    | error
    | error error
;

cell
   : FIXEDCELL {
      $$ = yy.handler.fixedCellValue.call(yy.obj, $1);
    }
  | FIXEDCELL ':' FIXEDCELL {
      $$ = yy.handler.fixedCellRangeValue.call(yy.obj, $1, $3);
    }
  | CELL {
      $$ = yy.handler.cellValue.call(yy.obj, $1);
    }
  | CELL ':' CELL {
      $$ = yy.handler.cellRangeValue.call(yy.obj, $1, $3);
    }
;

expseq
  : '[' expseq ']' {
      $$ = [$2];
  }
  | expseq ',' expseq {
      //$1.push($3);
      //$$ = $1;
      $$.push($3);
  }
  | expseq ',' expression {
        //$1.push($3);
        //$$ = $1;
        $$.push($3);
    }
;


expseq
  : expression {
      if (ruleJS.helper.isArray($1)) {
        $$ = $1;
      } else {
        $$ = [$1];
      }
    }
	| expseq ';' expression {
      $1.push($3);
      $$ = $1;
    }
 	| expseq ',' expression {
      $1.push($3);
      $$ = $1;
    }
;

variableSequence
	: VARIABLE {
      $$ = [$1];
    }
	| variableSequence DECIMAL VARIABLE {
      $$ = (ruleJS.helper.isArray($1) ? $1 : [$1]);
      $$.push($3);
    }
;

number
  : NUMBER {
      $$ = $1;
    }
	| NUMBER DECIMAL NUMBER {
      $$ = ($1 + '.' + $3) * 1;
    }
	| number '%' {
      $$ = $1 * 0.01;
    }
;

error
  : '#' VARIABLE '!' {
      $$ = $1 + $2 + $3;
    }
  | VARIABLE '#' VARIABLE '!' {
      $$ = $2 + $3 + $4;
    }
;

%%
