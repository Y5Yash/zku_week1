pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";
// include ""; // hint: you can use more than one templates in circomlib-matrix to help you

template SystemOfEquations(n) { // n is the number of variables in the system of equations
    signal input x[n]; // this is the solution to the system of equations
    signal input A[n][n]; // this is the coefficient matrix
    signal input b[n]; // this are the constants in the system of equations
    signal output out; // 1 for correct solution, 0 for incorrect solution

	signal temp[n][n];
	signal eqarr[n];
	signal cumusum[n];

	component iseq[n];
	component iszero;

    // [bonus] insert your code here
	for (var i = 0; i<n; i++)
	{
		temp[i][0] <== A[i][0] * x[0];
		for (var j = 1; j < n; j++)
		{
			temp[i][j] <== temp[i][j-1] + A[i][j] * x[j];
		}
		iseq[i] = IsEqual();
		iseq[i].in[0] <== temp[i][n-1];
		iseq[i].in[1] <== b[i];
		eqarr[i] <== 1 - iseq[i].out;
	}

	cumusum[0] <== eqarr[0];
	for (var i = 1; i < n; i++)
	{
		cumusum[i] <== cumusum[i-1] + eqarr[i];
	}

	iszero = IsZero();
	iszero.in <== cumusum[n-1];
	out <== iszero.out;
}

component main {public [A, b]} = SystemOfEquations(3);