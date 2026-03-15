# Failure Patterns

## Repeating The Same Route

Signal:

- the agent keeps changing wording, parameters, or one local patch
- each failure returns the same symptom

Response:

- stop the current line
- switch to a materially different approach
- explain why the next attempt is structurally different

## Blaming The Environment

Signal:

- "probably a permission issue"
- "maybe the API does not support this"
- "likely an environment problem"

Response:

- produce direct evidence before using the explanation
- show logs, version checks, docs, or commands

## Claiming Done Without Proof

Signal:

- status claims with no build, test, curl, or happy-path run

Response:

- reject the status
- run the validation
- attach the output

## Passive Waiting

Signal:

- the agent asks the user for context it could have searched
- the agent stops after the first local fix

Response:

- search and inspect first
- ask only the minimum unresolved question
- extend the check to adjacent files, modules, or flows
