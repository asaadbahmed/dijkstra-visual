const GRID_COLOR = "#f0f0f0"; // Color of the grid
const GRID_SIZE = 10; // NxN grid (how many columns, how many rows)
const DOT_SIZE = 5; // NxN dot (pixels)
const DOT_COLOR = "#000000"; // Color of each dot
const NODE_COLOR = "#0000FF"; // Color of each node
const NODE_SIZE = DOT_SIZE * 2; // NxN node (pixels)
const MAX_NODES = 10; // Maximum number of placeable nodes

let STATE = "idle"; // idle, placing-node, placing-edge

/*
// TODO: Cool animation for drawing the best path calculated by the algorithm
// TODO: Make it so if a node is x distance away from another node, it isn't allowed to be placed
// TODO: Add a max number of placable nodes
// TODO: If the placement button is hovered while in placement state, change the button text to "Cancel". Make the cursor a pointer/appear when you leave the grid and hide the node
// TODO: Check if state is, placing-node if it is, cancel the placement by removing the node and reseting the state
// TODO: Also change the button text to "Cancel" if it's hovered while in placement state
// TODO: Make sure to place the node in the center of the grid, or the current mouse pos (clamp it in if it is outside the grid)
// TODO: make sure to reset the cursor to default after placement is done
// TODO: Track & Check if there's already a node there    
// TODO: Disconnect the mousemove event listener
// TODO: Check if the click is within the grid
IGNORE THIS
Unrelated to the project just a random idea I had for something else
Maintain a list of unoccupied nodes
Choose a random node, pop that node from the list
*/

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
function placeNode() {
    const workspace = document.getElementById("workspace");
    const workspaceDimensions = workspace.getBoundingClientRect();
    const node = document.createElement("div");
    node.style.width = `${NODE_SIZE}px`;
    node.style.height = `${NODE_SIZE}px`;
    node.style.backgroundColor = NODE_COLOR;
    node.style.borderRadius = "50%";
    node.style.position = "absolute";    
    workspace.style.cursor = "none";
    workspace.appendChild(node);

    document.addEventListener("mousemove", function (data) {
        node.style.left = `${data.clientX}px`;
        node.style.top = `${data.clientY}px`;
    });
    
    document.addEventListener("click", function (data) {
        console.log("Place node at:", data.clientX, data.clientY);        
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const numberOfDots = GRID_SIZE * GRID_SIZE;
    const workspaceContainer = document.getElementById("workspace");
    const placeNodeButton = document.getElementById("place-node");
    
    try {
        if (!workspaceContainer) throw new Error("Element with id \"workspace\" does not exist..");
        if (!placeNodeButton) throw new Error("Element with id \"place-node\" does not exist.");
    } catch(error) {
        console.error(`${error} Please make sure all of these elements exist in /index.html. If they do, and the problem persists, it could be a loading issue.`);
        return;
    }
    
    placeNodeButton.addEventListener("click", placeNode);

    workspaceContainer.style.backgroundColor = GRID_COLOR;
    workspaceContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    workspaceContainer.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
    
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement("div");
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        dot.style.backgroundColor = DOT_COLOR;
        dot.style.borderRadius = "50%";
        workspaceContainer.appendChild(dot);
    }
});