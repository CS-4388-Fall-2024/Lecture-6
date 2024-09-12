/* Lecture 6
 * CS 4388/ CS 5388, Fall 2024, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ship: gfx.Mesh2;
    private star: gfx.Mesh2;
    
    private starfield: gfx.Particles2;

    private mousePosition: gfx.Vector2;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ship = gfx.Geometry2Factory.createBox();
        this.star = gfx.Geometry2Factory.createBox();

        this.starfield = new gfx.Particles2(this.star, 200);
    
        this.mousePosition = new gfx.Vector2();
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.renderer.viewport = gfx.Viewport.CROP;

        this.ship.scale.set(0.08, 0.08);
        this.ship.material.texture = new gfx.Texture('./ship.png');
        
        this.star.material.texture = new gfx.Texture('./star.png');

        for(let i = 0; i < this.starfield.numParticles; i++)
        {
            this.starfield.particleSizes[i] = Math.random()*0.008 + 0.002;
            this.starfield.particlePositions[i].set(Math.random()*2-1, Math.random()*2-1);
        }

        // Update the particle system position and sizes
        this.starfield.update(true, true);

        this.scene.add(this.starfield);
        this.scene.add(this.ship);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        const shipSpeed = 1.0; // normalized device units / sec

        if(this.ship.position.distanceTo(this.mousePosition) > 0.01)
        {
            this.ship.lookAt(this.mousePosition);

            const shipDirection = new gfx.Vector2(0, shipSpeed * deltaTime);
            shipDirection.rotate(this.ship.rotation);
            this.ship.position.add(shipDirection);
        }
    }

    /**
     * Method called when the mouse is clicked. Subclasses can override this method to handle the event.
     * 
     * @param event - The MouseEvent object associated with the mouse click
     */
    onMouseDown(event: MouseEvent): void 
    {
        // nothing to do here
    }

    /**
     * Method called when the mouse is moved. Subclasses can override this method to handle the event.
     * 
     * @param event - The MouseEvent object associated with the mouse movement
     */
    onMouseMove(event: MouseEvent): void 
    {
        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }
}