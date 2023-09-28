FROM rust:1.72 as build

WORKDIR /app

COPY Cargo.toml .
COPY Cargo.lock .
COPY src src

RUN rustup target add x86_64-unknown-linux-musl
RUN cargo build --target x86_64-unknown-linux-musl --release

FROM alpine:3.18

WORKDIR /app

COPY --from=build /app/target/x86_64-unknown-linux-musl/release/analyzer .

CMD ["./analyzer"]
