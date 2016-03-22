function createTile(x, y, z) {
    var geometry = new THREE.BoxGeometry( 3, 0.5, 3 );
    var material = new THREE.MeshBasicMaterial( {color: 0x4dd0e1} );
    var tile = new THREE.Mesh( geometry, material );
    tile.position.set(x, y, z);

    var box = new THREE.BoxHelper( tile );
    box.material.color.set( 0x0000ff );

    scene.add( tile );
    objects.push( tile );
}

function createBoard(rowStart, rowEnd, colStart, colEnd) {
    for(var row = rowStart; row < rowEnd; row++)
    {
        for(var col = colStart; col < colEnd; col++)
        {
            createTile(row * 3, 1, col * 3);
        }
    }
}

function onDocumentTouchStart( event ) {

	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );
}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {

        if (selectedTile != undefined)
		      selectedTile.material.color.setHex( 0x4dd0e1 );

        selectedTile = intersects[ 0 ].object;
		selectedTile.material.color.setHex( 0x00ff00 );
	}

	/*
	// Parse all the faces
	for ( var i in intersects ) {

		intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

	}
	*/
}
