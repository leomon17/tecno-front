<template>
    <div class="l-navbar scroller-nav">
        <div class="home">
            
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">TECNOCONTROL</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarScroll">
                    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">

                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/unidades">Unidades</RouterLink></a>
                        </li>
                        <!--
                        <li class="nav-item">
                            <a class="nav-link active" href="#" id="navbarDropdownMenuLink" role="button">
                                <RouterLink to="/reporte">Reporte</RouterLink> 
                            </a>
                        </li>
                        -->
                        <li class="nav-item">
                            <a class="nav-link active" href="#" id="navbarDropdownMenuLink" role="button">
                                <RouterLink to="/reportelocal">Reporte</RouterLink> 
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

        </div>
   
    </div>
   
</template>

<style>
.scroller-nav{
    width: 100%;
    display: block;
}
</style>