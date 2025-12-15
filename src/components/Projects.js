"use client";
import styles from "./Projects.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
    { title: "E-Commerce App", desc: "A modern shopping experience with clean UI." },
    { title: "Finance Dashboard", desc: "Data visualization and dark mode interface." },
    { title: "Travel Agency", desc: "Immersive booking platform with morph transitions." },
    { title: "Portfolio v1", desc: "Previous iteration of my personal brand." },
];

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <h2 className={styles.heading}>Selected Works</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className={styles.swiperContainer}
            >
                {projects.map((project, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slide}>
                            <div className={styles.imagePlaceholder} />
                            <div className={styles.content}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDesc}>{project.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
