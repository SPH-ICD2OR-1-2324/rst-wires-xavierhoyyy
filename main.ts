namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
function Wire_5 () {
    if (SerialNumber % 2 == 1) {
        Serial_Number_Odd = true
    }
    Red1 = 0
    Yellow1 = 0
    for (let value of WireList) {
        if (value == 0) {
            Red1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 3) {
            Yellow1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 4) {
            Black1 += 1
        }
    }
    if (WireList[4] == 4 && Serial_Number_Odd == true) {
        game.splash("Cut the 4th wire")
    } else if (Red1 == 1 && Yellow1 > 1) {
        game.splash("Cut the first wire")
    } else if (Black1 == 0) {
        game.splash("Cut the second wire")
    } else {
        game.splash("Cut the first wire")
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // tell the program if the wires are = 3 it pulls up Function "3wires"
    // 
    // Same for Wire4, Wire5 and Wire6
    if (wireCount == 3) {
        _3wires()
    }
    if (wireCount == 4) {
        Wire_4()
    }
    if (wireCount == 5) {
        Wire_5()
    }
    if (wireCount == 6) {
        Wire_6()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    // Red = 0
    // White = 1
    // Blue = 2
    // Yellow = 3
    // Black = 4
    // 
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function Wire_4 () {
    // Tell my program to divide the last digit if the serial number and if it is equal to 1 it is odd
    if (SerialNumber % 2 == 1) {
        Serial_Number_Odd = true
    }
    Red1 = 0
    Blue_1 = 0
    Yellow1 = 0
    // If there is a red wire change red count by 1
    for (let value of WireList) {
        if (value == 0) {
            Red1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 2) {
            Blue_1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 3) {
            Yellow1 += 1
        }
    }
    if (Red1 > 1 && Serial_Number_Odd == true) {
        game.splash("Cut the last red wire")
    } else if (WireList[3] == 3 && (WireList[0] != 0 && (WireList[1] != 0 && WireList[2] != 0))) {
        game.splash("Cut the first wire")
    } else if (Blue_1 == 1) {
        game.splash("Cut the first wire")
    } else if (Yellow1 > 1) {
        game.splash("Cut the second wire")
    } else {
        game.splash("Cut the second wire")
    }
}
function _3wires () {
    Blue_1 = 0
    // Tell my code that if there is a blue wire it increases my blue wire count by 1 and if it is >, =, < to 1 or 0 it splashes my text to cut a certain wire
    for (let value of WireList) {
        if (value == 2) {
            Blue_1 += 1
        }
    }
    // Wire position and not equal to wire colour
    if (WireList[0] != 0 && (WireList[1] != 0 && WireList[2] != 0)) {
        game.splash("Cut the second wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (Blue_1 > 1) {
        game.splash("Cut the last blue wire")
    } else {
        game.splash("Cut the last wire")
    }
}
function Wire_6 () {
    if (SerialNumber % 2 == 1) {
        Serial_Number_Odd = true
    }
    Yellow1 = 0
    White1 = 0
    Red1 = 0
    for (let value of WireList) {
        if (value == 0) {
            Red1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 3) {
            Yellow1 += 1
        }
    }
    for (let value of WireList) {
        if (value == 1) {
            White1 += 1
        }
    }
    if (Yellow1 == 0 && Serial_Number_Odd == true) {
        game.splash("Cut the third wire")
    } else if (Yellow1 == 1 && White1 > 1) {
        game.splash("Cut the 4th wire")
    } else if (Red1 > 1) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the 4th wire")
    }
}
let White1 = 0
let Blue_1 = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let Black1 = 0
let WireList: number[] = []
let Yellow1 = 0
let Red1 = 0
let Serial_Number_Odd = false
let SerialNumber = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
