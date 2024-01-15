# How to create a camera shake effect in Unity

Published on August 16, 2023

![creating a camera shake effect in unity](https://cdn.sanity.io/images/ok7qsbpm/production/7d211a7291bb786b3ff2b07f72b8b3e969e481ab-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

To create a compelling story, different mechanisms are used, one of them is the camera shake effect, used to portray some kind of violence like a bomb going off or you being shot at.

Visual effects are a great way to **improve your storytelling abilities in games.** Effects simulate the imagined events in the story and it makes players attached to your game. One of the effects is the **_screen or camera shake effect,_** this is one of many tools in the game maker’s toolkit. The camera shake effects can be used in different ways, it can be used to portray when a bomb goes off, when a barrel explodes, when you get hit by a gun and so much more. In this tutorial, we shall learn how to produce a camera shake or screen shake effect in our games using unity.

First of all, we need to create a script and name it **_CameraShake,_** we then move on to **_attach the script to our main camera_**

This is where we start coding and things start to get fun, open your script, and lets have some fun.

![](https://cdn.sanity.io/images/ok7qsbpm/production/63fe5d2021a1fc5a865054563da44b798d63e900-646x901.png)

We will be using a function called **_Random.insideUnitSphere,_** according to unity, [_it Returns a random point inside a sphere with radius 1_](https://docs.unity3d.com/ScriptReference/Random-insideUnitSphere.html). We will be choosing random points within a sphere and make our main camera move there and back to our original position, thus creating a shake effect. The following are the variables we will need to create the camera shake effect(it pays to know your variables you will be working with beforehand).

1. **_cameraTransform_** = it is the transform of the camera.
2. **_originalPosOfCamera_** = this is the original position of our camera; this is where the camera will return to after shaking.
3. **_shakeFrequency_** = it can be said it is the radius of our circle, this will be multiplied to **_random.insideUnitSphere_**, thus the higher the number of the shake frequency the greater our radius, and the lower the number of our radius the lower the shake frequency. The reason this will be happening is that, the **_random.insideUnitSphere_** selects a point at **vector3(0,0,0)** within the radius of one, by multiplying it by the shake frequency of a higher number the radius of the circle to choose from also expands, creating a high frequency or a bigger radius to choose a random point from, if you want to create a lower frequency make the shake frequency or in other words the radius low as well.

> Random.insideUnitSphere Returns a random point inside a sphere with radius 1.

Now that we know what variables we will be using let’s find out how to create them. We start by declaring all our variables, we make the **_cameraTransform_** and the **_shakeFrequency_** public variables because we will like to assign them in the inspector window. Go ahead and make the **_originalPosOfCamera_** private.

![](https://cdn.sanity.io/images/ok7qsbpm/production/0cf3cb48c1dcf4f509f2fa9d5cdddd816132a748-461x106.png)

On **_void Start()_**, we assign the current camera position to **_originalPosOfCamera_**,

this is where the camera will be after shaking. **Take note that this does not apply to cameras that are constantly moving.** That will be in another HOW-TO article.

We then move on to the **_Update(),_** in this place things get a little trickier.

Here we must get the input of the key S, every time it is pressed, and also get the input when it is pressed but and held, hence the **_Input.GetKey,_** which always stays true when a key is pressed and the key is being held in place, that calls the **_CameraShake()_** function. This leads us to the second conditional statement, the **_else if_**, we must note that the **_else if_** statement is dependent on the **_if statement_**, thus the computer will check the value of the **_if statement_** if it is true, if true it will keep on executing the task, the moment it becomes false the computer checks the **_else if statement_** to see if it is true, if it is true the computer executes the task in there, that is why we used the **_Input.GetKeyUp_** here, because one will be holding the S key for the shake to happen, and the moment you removes your hand the else if statement becomes true and that also calls the **_StopShake()_** function.

Probably by now, you have noticed that we used functions instead of writing our code in the Update function, it will be totally fine if you write yours inside the update function. But because we want our code to be more readable and easier to fix when there is an error we used functions.

Now the first function which is called when one **_presses the S key_** is the **_CameraShake()_** function.

![](https://cdn.sanity.io/images/ok7qsbpm/production/b73c69a41d8191abce57201658b4f89d2432da04-720x143.png)

When this function is called what it does basically is that it changes the camera position to the random point selected by the **_Random.insideUnitSphere_**. The **_Random.insideUnitSphere_** always has a center position **(NB: It is a sphere)** of **Vector3(0,0,0)**, to choose a position around the camera, we add the original camera position to the value of **_Random.insideUinitSphere_**, thus **offsetting the value**. For example, say the **_Transform.position_** of our camera is **Vector3(10,5,10)** when we add it to **_Random.insideUnitSphere_** its coordinates changes from **Vector3(0,0,0)** to the coordinates of **Vector3(10,5,10)**, thus it chooses a point around where our camera is located. We then multiply it by our **_shakeFrequency_** in other words our **radius.** **The bigger the radius the higher the shake frequency and vice versa.**

The second and last function is the **_StopShake()_** function.

![](https://cdn.sanity.io/images/ok7qsbpm/production/f7c5966f0bdaddcc8ef193fe3ed4ab03e6ff42be-560x142.png)

This function returns the camera to its original position when the **S key is released.**

Well, we finished and this is what we created…

How it went.

Well and that is it, that is how to create a camera shake effect in games. But remember this **only applies to stationary cameras,** for it to work for a moving camera some little tweaks have to be made, hopefully, I hope I can do another tutorial about that also. But remember you can edit it the way you want it, tweak the code for your purpose, feel free and have fun with it. This is a **_[GitHub link for the whole project.](https://github.com/Konadu-Akwasi-Akuoko/Easy-Camera-Shake-Effect-In-Unity) _**Also here is the code if you want to copy it:

```undefined
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//This script requires the component of Transform. It attaches a transform if none is attached.
[RequireComponent(typeof(Transform))]
public class CameraShakeScript : MonoBehaviour
{
    public Transform cameraTransform = default;
    private Vector3 _orignalPosOfCam = default;
    public float shakeFrequency = default;

    // Start is called before the first frame update
    void Start()
    { 
        //When the game starts make sure to assign the origianl possition of the camera, to its current
        //position, supposedly it is where you want the camera to return after shaking.
        _orignalPosOfCam = cameraTransform.position; 
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.S))
        {
            //Make sure to assign the value of shakeFrequency in the inspector 
            //or uncomment the next line to assign it here.
            //shakeFrequency = 0.2f;

            CameraShake();
        }
        else if (Input.GetKeyUp(KeyCode.S))
        {
            StopShake();
        }
    }

    private void CameraShake()
    {
        //This moves the camera position to the random point chosen within the circle around the camera.
        //NB:Our Random.insideUnitSphere selects a random position every frame because of GetKey
        //which is called every frame, and that causes the shaking.
        cameraTransform.position = _orignalPosOfCam + Random.insideUnitSphere * shakeFrequency;
    }

    private void StopShake()
    {
        //Return the camera to it's original position.
        cameraTransform.position = _orignalPosOfCam;
    }
}

```

I hope this tutorials helped you and gave you some idea of how the VFX effect of a camera shake looks like.