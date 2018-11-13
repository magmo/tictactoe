pragma solidity ^0.4.18;

contract TicTacToehelpers {

    //
    // Unravelling of grid is as follows:
    // 
    //      0  |  1  |  2  
    //   +-----------------+
    //      3  |  4  |  5  
    //   +-----------------+
    //      6  |  7  |  8  
    // 
    // The binary representation for a single mark is 2**(8-index).
    //
    // e.g. noughts = 000000001
    //      crosses = 010000000
    // 
    // corresponds to 
    //
    //         |  X  |     
    //   +-----------------+
    //         |     |     
    //   +-----------------+
    //         |      |  0  
    // 
    //
    // 0b111000000 = 448 /* mask for win @ row 1 */
    // 0b000111000 =  56 /* mask for win @ row 2 */
    // 0b000000111 =   7 /* mask for win @ row 3 */
    // 0b100100100 = 292 /* mask for win @ col 1 */
    // 0b010010010 = 146 /* mask for win @ col 2 */
    // 0b001001001 =  73 /* mask for win @ col 3 */
    // 0b100010001 = 273 /* mask for win @ downhill diag */
    // 0b001010100 =  84 /* mask for win @ uphill diag */
    //
    // 0b111111111 = 511 /* full board */

    function hasWon(uint16 _marks) public pure returns (bool) {
        return (
            ((_marks & 448) == 448) ||
            ((_marks & 56 ) == 56 ) ||
            ((_marks & 7  ) == 7  ) ||
            ((_marks & 292) == 292) ||
            ((_marks & 146) == 146) ||
            ((_marks & 73 ) == 73 ) ||
            ((_marks & 273) == 273) ||
            ((_marks & 84 ) == 84 ) 
            );
    }

    function isDraw(uint16 _noughts, uint16 _crosses) public pure returns (bool) {
        if((_noughts ^ _crosses) == 511) { 
            return true; // using XOR. Note that a draw could include a winning position that is unnoticed / unclaimed
        }
    }

    function madeStrictlyOneMark(uint16 _new_marks, uint16 _old_marks) public pure returns (bool){
        uint16 i;
        bool already_marked = false;
        for (i = 0; i < 9; i++){
            if ((_new_marks >> i)%2 == 0 && (_old_marks >> i)%2 == 1){
                return false; // erased a mark
            } 
            else if ((_new_marks >> i)%2 == 1 && (_old_marks >> i)%2 == 0){
                if (already_marked == true){
                    return false; // made two or more marks
                }
                already_marked = true; // made at least one mark
            }
        }
        return true;
    }

    function areDisjoint(uint16 _noughts, uint16 _crosses) public pure returns (bool) {
        if((_noughts & _crosses) == 0){
            return true;
        }
    }
}