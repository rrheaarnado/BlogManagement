FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5205

ENV ASPNETCORE_URLS=http://+:5205

# DO NOT switch to app yet (leave as root here)


FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["BlogAPI.csproj", "./"]
RUN dotnet restore "BlogAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BlogAPI.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "BlogAPI.csproj" -c $configuration -o /app/publish /p:UseAppHost=false


FROM base AS final
WORKDIR /app

# must be root here
USER root

# Install timezone data
RUN apt-get update && apt-get install -y tzdata \
    && rm -rf /var/lib/apt/lists/*

# Set container timezone
ENV TZ=Asia/Manila

#drop back to app user for security
USER app

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlogAPI.dll"]
